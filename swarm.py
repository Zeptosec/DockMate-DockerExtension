import docker
import paramiko
from Container import Container
from Service import Service

class Swarm:
    def __init__(self) -> None:
        #initialize docker client
        self.client = docker.from_env()
        
        #get node list
        self.nodes = self.client.nodes.list()
        i=1
        for node in self.nodes:
            node_spec = {
                'Availability': 'active',
                'Name': f"node-{i}",
                'Role': node.attrs['Spec']['Role'],
                'Labels': {'customid': node.id}
            }
            i += 1
            node.update(node_spec)

        self.containers = []
        for i in range(len(self.nodes)):
            # get service info and change conatiner info acording to it.
            container = Container(self.nodes[i], self.getNodeFreeMemory(self.nodes[i].id))
            for service in self.client.services.list():
                if self.nodes[i].id == service.attrs["Spec"]["Labels"]["node_id"]:
                    container.free_memory -= service.attrs["Spec"]["TaskTemplate"]["Resources"]["Limits"]["MemoryBytes"]
            self.containers.append(container)
    
    # execute command with ssh on other server and get string lines
    def __execSSH(self, node_id: str, command: str) -> list[str]:
        node_info = self.client.nodes.get(node_id)
        ip = node_info.attrs['Status']['Addr']
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(ip, username='root', key_filename='./foo')

        stdin, stdout, stderr = ssh.exec_command(command)
        lines = stdout.readlines()
        ssh.close()
        return lines
    
    # get executed command string lines
    def execCommandOnNode(self, node_id: str, command: str):
        """
        Executes command on node.
        
        Args:
            node_id (str): node id
            command (str): command to execute on node
            
        Returns:
            list[str]: List of strings that were printed when command executed
        """
        return self.__execSSH(node_id, command)
    
    
    def getNodeFreeMemory(self, node_id: str):
        """
        Gets amount memory free on node.
        
        Returns:
            Amount of bytes available on node.
        """
        
        lines = self.__execSSH(node_id, 'free -b')
        freeb = int(lines[1].split(' ')[-1])
        return freeb
    
    def BFAlgorith(self, service_name: str, service_size: float):
        #performs BF algorithm on nodes
        new_service_size = int(service_size*(10**9))

        best_pos = -1
        for i in range(len(self.containers)):#find best position for service to add
            if(self.containers[i].free_memory >= new_service_size):
                if best_pos == -1:
                    best_pos = i
                elif self.containers[best_pos].free_memory  > self.containers[i].free_memory:
                    best_pos = i
        
        
        if best_pos != -1:#found best position and service inserted into container
            #execute ssh command
            service = self.client.services.create(service_name, labels={"node_id": self.containers[best_pos].id},constraints=[f"node.labels.customid=={self.containers[best_pos].id}"], resources=docker.types.Resources(mem_limit=new_service_size, mem_reservation=new_service_size))
            
            service = Service(service.id, service_name, new_service_size, self.containers[best_pos].id)
            self.containers[best_pos].services.append(service)
            self.containers[best_pos].free_memory -= new_service_size
            return True
        
        #return false if best position was not found
        return False

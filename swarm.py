import docker
import paramiko
from pprint import pprint

class Swarm:
    def __init__(self) -> None:
        #initialize docker client
        self.client = docker.from_env()
        
        #get node list
        self.nodes = self.client.nodes.list()
        self.execCommandOnNode(self.nodes[1].id, "touch /home/virgil2/veik.txt")
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
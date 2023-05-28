from swarm import Swarm

mySwarm = Swarm()
for node in mySwarm.nodes:
    print(f"node: {node.id}, freeMem: {mySwarm.getNodeFreeMemory(node.id)}")
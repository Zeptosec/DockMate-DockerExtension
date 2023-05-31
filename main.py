from swarm import Swarm

mySwarm = Swarm()
print("Before BF algorithm:")
for node in mySwarm.nodes:
    print(f"node: {node.id}, freeMem: {mySwarm.getNodeFreeMemory(node.id)}")

print(mySwarm.BFAlgorith("nginx", 1))
print("After BF algorithm:")
for node in mySwarm.nodes:
    print(f"node: {node.id}, freeMem: {mySwarm.getNodeFreeMemory(node.id)}")

from swarm import Swarm

mySwarm = Swarm()
print("Before BF algorithm:")
for container in mySwarm.containers:
    print(f"node: {container.id}, freeMem: {container.free_memory}")

print(mySwarm.BFAlgorith("nginx", 1))
print("After BF algorithm:")
for container in mySwarm.containers:
    print(f"node: {container.id}, freeMem: {container.free_memory}")

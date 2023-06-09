from swarm import Swarm
from fastapi import FastAPI
from pydantic import BaseModel
from pprint import pprint
mySwarm = Swarm()
app = FastAPI()

class Item(BaseModel):
    name: str
    requiredMemory: int



@app.get("/")
def index() -> dict[str, object]:
    values = []
    for node in mySwarm.containers:
        conts = []
        values.append({
            'id': node.id,
            'name': node.node.attrs['Spec']['Name'],
            'freeMemory': mySwarm.getNodeFreeMemory(node.id),
            'totalMemory': node.node.attrs['Description']['Resources']['MemoryBytes'],
            'role': node.node.attrs['Spec']['Role'],
            'containers': conts
        })
    return {"nodes": values}

@app.post("/")
def createService(service) -> dict[str, object]:
    print(service)
# print("Before BF algorithm:")
# for container in mySwarm.containers:
#     print(f"node: {container.id}, freeMem: {container.free_memory}")

# print(mySwarm.BFAlgorith("nginx", 1))
# print("After BF algorithm:")
# for container in mySwarm.containers:
#     print(f"node: {container.id}, freeMem: {container.free_memory}")

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
    return {"nodes": [{'name': 'dd'}]}


# print("Before BF algorithm:")
# for container in mySwarm.containers:
#     print(f"node: {container.id}, freeMem: {container.free_memory}")

# print(mySwarm.BFAlgorith("nginx", 1))
# print("After BF algorithm:")
# for container in mySwarm.containers:
#     print(f"node: {container.id}, freeMem: {container.free_memory}")

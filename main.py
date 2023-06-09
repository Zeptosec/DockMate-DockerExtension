from swarm import Swarm
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    requiredMemory: int

items = {
    0: Item(name="Nice")
}

@app.get("/")
def index() -> dict[str, dict[int, Item]]:
    return {"items": items}

# mySwarm = Swarm()
# print("Before BF algorithm:")
# for container in mySwarm.containers:
#     print(f"node: {container.id}, freeMem: {container.free_memory}")

# print(mySwarm.BFAlgorith("nginx", 1))
# print("After BF algorithm:")
# for container in mySwarm.containers:
#     print(f"node: {container.id}, freeMem: {container.free_memory}")

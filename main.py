from swarm import Swarm
from fastapi import FastAPI
from pydantic import BaseModel
mySwarm = Swarm()
print(mySwarm)
exit(1)
app = FastAPI()

class Item(BaseModel):
    name: str
    requiredMemory: int



@app.get("/")
def index() -> dict[str, dict[int, Item]]:
    items = {
        
    }
    return {"items": items}


# print("Before BF algorithm:")
# for container in mySwarm.containers:
#     print(f"node: {container.id}, freeMem: {container.free_memory}")

# print(mySwarm.BFAlgorith("nginx", 1))
# print("After BF algorithm:")
# for container in mySwarm.containers:
#     print(f"node: {container.id}, freeMem: {container.free_memory}")

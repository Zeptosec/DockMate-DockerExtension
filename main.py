from swarm import Swarm
from fastapi import FastAPI
from pydantic import BaseModel
from pprint import pprint
from fastapi.middleware.cors import CORSMiddleware
mySwarm = Swarm()
app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
class Item(BaseModel):
    name: str
    requiredMemory: int



@app.get("/api")
def index() -> dict[str, object]:
    return {"nodes": [{'name': str(mySwarm.containers[0].id)}]}


# print("Before BF algorithm:")
# for container in mySwarm.containers:
#     print(f"node: {container.id}, freeMem: {container.free_memory}")

# print(mySwarm.BFAlgorith("nginx", 1))
# print("After BF algorithm:")
# for container in mySwarm.containers:
#     print(f"node: {container.id}, freeMem: {container.free_memory}")

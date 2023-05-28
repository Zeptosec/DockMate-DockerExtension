## Docker *Better* extension (DockMate)
This is a python script that extends docker library

# Setup
Setup docker on a few machines and connect them up in a swarm. Once that is done you will need to setup passwordless ssh with root. Refer to <a href="https://linuxconfig.org/how-to-install-start-and-connect-to-ssh-server-on-fedora-linux" _target="blank">this</a> tutorial for setting up and enabling ssh server (you can skip the part where key is being created and use the one provided with this repo). Then for configuring ssh server: <a href="https://askubuntu.com/questions/115151/how-to-set-up-passwordless-ssh-access-for-root-user" _target="blank">here</a>. Make sure to setup ssh server on **all** machines! Even on the **manager**!

# Example
Get free memory of nodes
```python
from swarm import Swarm

mySwarm = Swarm()
for node in mySwarm.nodes:
    print(f"node: {node.id}, freeMem: {mySwarm.getNodeFreeMemory(node.id)}")
```
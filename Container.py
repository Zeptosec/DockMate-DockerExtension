class Container:
    def __init__(self, node, free_memory):
        #initialize container
        self.id = node.id
        self.free_memory = free_memory
        self.services = []
        self.node = node
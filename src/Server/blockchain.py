#########################
##       imports       ##
#########################
import json
import numpy
import hashlib #crypto SHA256
from constants import *
#########################

class Blockchain(object):
    """docstring for Blockchain.
        hash level denotes the proof of work difficulty.
    """
    def __init__(self, hashlevel):
        super(Blockchain, self).__init__()
        self.hashlevel = hashlevel
        self.chain = list()
        self.addBlock(GENESIS)

    def hash_256(data):
        # hashes data string into SHA256 string
        return hashlib.sha256(data.encode('utf-8')).hexdigest()

    def addBlock(self, data):
        """data: JSON string which contains inputs from UI
        """
        hv = self.getHeight() #stores height of Blockchain

        #use hash function to add curr_hash
        temp = json.loads(data)
        if hv == 0:
            temp['curr_hash'] = Blockchain.hash_256(data)
        else:
            temp['prev_hash'] = self.getHash(hv-1)
            temp['curr_hash'] = Blockchain.hash_256(json.dumps(temp))

        # parse json to add hash data
        self.chain.append(temp)

    def getBlock(self, id):
        return self.chain[id]

    def getHash(self, id):
        data = self.chain[id]
        return data['curr_hash']

    def getHeight(self):
        return len(self.chain)

    def __repr__(self):
        #USE JSON TO PRINT STRING
        data = []
        for elem in self.chain:
            data.append(json.dumps(elem))
        return str(data)

    def getChain(self):
        return self.chain

    def printChain(self):
        for elem in self.chain:
            print(json.dumps(elem))

def test():
    votechain = Blockchain(5)
    votechain.printChain()
    print(votechain.getChain())

def main():
    test()


#########################
##        Main         ##
#########################

if __name__ == '__main__':
    main()

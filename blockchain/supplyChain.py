import hashlib
import json
from datetime import datetime


class Block:
    def __init__(self, timestamp, product_data, previous_hash=""):
        """
        Initialize a block in the blockchain.
        :param timestamp: Time of creation of the block.
        :param product_data: Data about the product (e.g., location, status, etc.).
        :param previous_hash: Hash of the previous block in the chain.
        """
        self.timestamp = timestamp
        self.product_data = product_data
        self.previous_hash = previous_hash
        self.counter = 0  # Counter used for Proof of Work (mining).
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        """
        Calculate the hash of the block.
        :return: The SHA-256 hash of the block's data.
        """
        block_string = (
            str(self.timestamp)
            + json.dumps(self.product_data)
            + self.previous_hash
            + str(self.counter)
        )
        return hashlib.sha256(block_string.encode()).hexdigest()

    def mine_block(self, complexity):
        """
        Perform Proof of Work to find a hash that meets the complexity requirement.
        :param complexity: The number of leading zeroes required in the hash.
        """
        target = "0" * complexity
        while self.hash[:complexity] != target:
            self.counter += 1
            self.hash = self.calculate_hash()
        print(f"Block mined: {self.hash}")


class SupplyChain:
    def __init__(self):
        """
        Initialize the supply chain blockchain.
        """
        self.chain = [self.create_genesis_block()]
        self.complexity = 2  # Difficulty level for mining.
        self.pending_records = []

    def create_genesis_block(self):
        """
        Create the genesis block (first block) in the blockchain.
        :return: A block representing the genesis block.
        """
        genesis_data = {
            "product_id": "GENESIS",
            "status": "Created",
            "location": "Origin",
            "timestamp": str(datetime.now()),
        }
        return Block(datetime.now(), genesis_data, "0")

    def get_latest_block(self):
        """
        Get the most recent block in the blockchain.
        :return: The latest block in the chain.
        """
        return self.chain[-1]

    def add_record(self, product_data):
        """
        Add a new record to the list of pending records.
        :param product_data: Information about the product stage.
        """
        self.pending_records.append(product_data)

    def mine_pending_records(self):
        """
        Mine the pending records into a new block and add it to the blockchain.
        """
        if not self.pending_records:
            print("No records to mine.")
            return

        # Create a new block with the pending records.
        new_block = Block(
            datetime.now(), self.pending_records, self.get_latest_block().hash
        )
        new_block.mine_block(self.complexity)

        # Add the new block to the chain and clear pending records.
        self.chain.append(new_block)
        self.pending_records = []

    def is_chain_valid(self):
        """
        Check if the blockchain is valid by verifying hashes and links.
        :return: True if the chain is valid, False otherwise.
        """
        for i in range(1, len(self.chain)):
            current_block = self.chain[i]
            previous_block = self.chain[i - 1]

            if current_block.hash != current_block.calculate_hash():
                return False

            if current_block.previous_hash != previous_block.hash:
                return False

        return True

    def display_chain(self):
        """
        Print the entire blockchain.
        """
        for i, block in enumerate(self.chain):
            print(f"Block {i}:")
            print(f"  Timestamp: {block.timestamp}")
            print(f"  Product Data: {block.product_data}")
            print(f"  Previous Hash: {block.previous_hash}")
            print(f"  Hash: {block.hash}")
            print(f"  Counter: {block.counter}")
            print("-" * 30)


# Example: Using the Supply Chain Blockchain
supply_chain = SupplyChain()

# Add product stages to the supply chain
supply_chain.add_record(
    {"product_id": "12345", "status": "Manufactured", "location": "Factory A"}
)
supply_chain.mine_pending_records()
supply_chain.add_record(
    {"product_id": "12345", "status": "Shipped", "location": "Warehouse B"}
)

# Mine the pending records into a block
supply_chain.mine_pending_records()

# Add another stage
supply_chain.add_record(
    {"product_id": "12345", "status": "Delivered", "location": "Retail Store C"}
)

# Mine the new stage
supply_chain.mine_pending_records()


print("\nIs the chain valid?", supply_chain.is_chain_valid())


print("\nBlockchain Data:")
supply_chain.display_chain()

import asyncio
import hashlib
import json
import time
from typing import List, Dict, Set
from dataclasses import dataclass
from enum import Enum
from urllib.parse import urlparse
from Python.EIS_final import WeightBasedEISCalculator 
from pydantic import BaseModel
import httpx
from datetime import datetime, timedelta
from typing import Optional


class EWasteStatus(Enum):
    COLLECTED = "collected"
    SORTED = "sorted"
    DISMANTLED = "dismantled"
    PROCESSED = "processed"
    RECYCLED = "recycled"

@dataclass
class EWasteItem:
    item_id: str
    type: str
    weight: float
    components: List[str]
    manufacturer: str
    year: int

@dataclass
class TransactionModel(BaseModel):
    sender: str
    recipient: str
    ewaste_items: List[EWasteItem]
    transaction_type: str
    status: EWasteStatus

class TokenTransaction:
    def __init__(self, sender: str, recipient: str, amount: float, timestamp: datetime, transaction_hash: str, memo: Optional[str] = None):
        self.sender = sender
        self.recipient = recipient
        self.amount = amount
        self.timestamp = timestamp
        self.transaction_hash = transaction_hash
        self.memo = memo

class TokenSystem:
    def __init__(self):
        self.balances = {}
        self.token_transactions = []
        self.account_locks = {}

    def _validate_transfer(self, sender: str, amount: float):
        """Validate if sender has enough balance and that amount is positive"""
        if sender not in self.balances:
            raise ValueError(f"Sender account {sender} does not exist.")
        if self.balances[sender] < amount:
            raise ValueError(f"Sender {sender} has insufficient funds.")
        if amount <= 0:
            raise ValueError("Transfer amount must be positive.")

    def create_account(self, account: str):
        """Create an account with zero balance"""
        self.balances[account] = 0.0

    def _create_transaction_hash(self, sender: str, recipient: str, amount: float, timestamp: datetime) -> str:
        """Generate a hash for the transaction using the details"""
        transaction_data = f"{sender}{recipient}{amount}{timestamp}"
        return hashlib.sha256(transaction_data.encode('utf-8')).hexdigest()

    def _proof_of_work(self, sender: str, amount: float) -> bool:
        """Simulate mining by requiring proof of work for every transfer"""
        difficulty = 5  # Increase difficulty to make it harder
        target = '0' * difficulty  # Target hash must start with '00000'
        
        # Try different nonces until we find one that satisfies the difficulty
        nonce = 0
        while True:
            transaction_data = f"{sender}{amount}{nonce}"
            hash_attempt = hashlib.sha256(transaction_data.encode('utf-8')).hexdigest()
            if hash_attempt.startswith(target):
                print(f"Mining successful with nonce {nonce}. Hash: {hash_attempt}")
                return True
            nonce += 1
            time.sleep(0.1)  # Add a delay to simulate mining effort

    def transfer(self, sender: str, recipient: str, amount: float, memo: Optional[str] = None) -> TokenTransaction:
        """Transfer tokens from sender to recipient with mining complexity"""
        self._validate_transfer(sender, amount)
        
        # Perform proof of work before allowing the transfer
        if not self._proof_of_work(sender, amount):
            raise ValueError("Failed proof of work.")
        
        # Create recipient account if it doesn't exist
        if recipient not in self.balances:
            self.create_account(recipient)
        
        # Execute transfer
        self.balances[sender] -= amount
        self.balances[recipient] += amount
        
        # Lock recipient's account temporarily (e.g., 5 seconds)
        self.account_locks[recipient] = datetime.now() + timedelta(seconds=5)
        
        # Record transaction
        timestamp = datetime.now()
        transaction_hash = self._create_transaction_hash(sender, recipient, amount, timestamp)
        
        transaction = TokenTransaction(
            sender=sender,
            recipient=recipient,
            amount=amount,
            timestamp=timestamp,
            transaction_hash=transaction_hash,
            memo=memo
        )
        self.token_transactions.append(transaction)
        
        return transaction

def valid_hash_proof(guess_hash: str) -> bool:
    """Check if hash meets difficulty requirement (4 leading zeros)"""
    return guess_hash[:4] == "0000"

def valid_proof(last_proof: int, proof: int, last_hash: str) -> bool:
    """Validate proof of work"""
    guess = f"{last_proof}{proof}{last_hash}".encode()
    return valid_hash_proof(hashlib.sha256(guess).hexdigest())

class RecycleChain:
    def __init__(self):
        self.chain = []
        self.current_transactions = []
        self.nodes: Set[str] = set()
        self.recycling_rewards = {
            'CIRCUIT_BOARDS': 2,
            'BATTERIES': 1.5,
            'SCREENS': 1,
            'PLASTICS': 0.5,
            'METALS': 1,
            'HAZARDOUS': 3
        }
        
        # Create genesis block
        self.new_block(previous_hash="1", proof=100)

    def register_node(self, address: str) -> None:
        """Add a new node to the list of nodes"""
        parsed_url = urlparse(address)
        if parsed_url.netloc:
            self.nodes.add(parsed_url.netloc)
        elif parsed_url.path:
            self.nodes.add(parsed_url.path)
        else:
            raise ValueError("Invalid URL")

    def new_block(self, proof: int, previous_hash: str) -> Dict:
        """Create a new block in the blockchain"""
        block = {
            'index': len(self.chain) + 1,
            'timestamp': time.time(),
            'transactions': self.current_transactions,
            'proof': proof,
            'previous_hash': previous_hash or self.hash(self.chain[-1])
        }
        
        self.current_transactions = []
        self.chain.append(block)
        return block

    def add_transaction(self, 
                       sender: str, 
                       recipient: str, 
                       ewaste_items: List[EWasteItem],
                       transaction_type: str,
                       status: EWasteStatus) -> int:
        """Add a new transaction to the list of transactions"""
        from Python.EISnumeric import Using

        transaction = {
            'sender': sender,
            'recipient': recipient,
            'timestamp': time.time(),
            'type': transaction_type,
            'status': status.value,
            'ewaste_items': [vars(item) for item in ewaste_items],
            'EIS': Using(),
            'reward': self.calculate_rewards(ewaste_items)
        }
        
        self.current_transactions.append(transaction)
        return self.last_block['index'] + 1

    
    @property
    def last_block(self) -> Dict:
        """Get the last block in the chain"""
        return self.chain[-1] if self.chain else None

    @staticmethod
    def hash(block: Dict) -> str:
        """Create a SHA-256 hash of a block"""
        block_string = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()

    def proof_of_work(self, last_block: Dict) -> int:
        """Calculate the proof of work for mining"""
        last_proof = last_block['proof']
        last_hash = self.hash(last_block)
        
        proof = 0
        while not valid_proof(last_proof, proof, last_hash):
            proof += 1
            
        return proof

    async def async_proof_of_work(self, last_block: Dict) -> int:
        """Asynchronously calculate the proof of work"""
        return await asyncio.to_thread(self.proof_of_work, last_block)

    def valid_chain(self, chain: List[Dict]) -> bool:
        """Check if a blockchain is valid"""
        last_block = chain[0]
        current_index = 1
        
        while current_index < len(chain):
            block = chain[current_index]
            last_block_hash = self.hash(last_block)
            
            # Check hash link
            if block['previous_hash'] != last_block_hash:
                return False
                
            # Check proof of work
            if not valid_proof(last_block['proof'], block['proof'], last_block_hash):
                return False
                
            last_block = block
            current_index += 1
            
        return True


    async def resolve_conflicts(self) -> bool:
        """Consensus algorithm: resolve conflicts by replacing the chain with the longest valid chain."""
        neighbours = self.nodes
        new_chain = None
        max_length = len(self.chain)
        
        async with httpx.AsyncClient() as client:
            for node in neighbours:
                try:
                    response = await client.get(f"http://{node}/chain")
                    if response.status_code == 200:
                        response_json = response.json()
                        length = response_json['length']
                        chain = response_json['chain']
                        
                        if length > max_length and self.valid_chain(chain):
                            max_length = length
                            new_chain = chain
                except httpx.RequestError as e:
                    print(f"Request failed for node {node}: {e}")
        
        if new_chain:
            self.chain = new_chain
            return True
        
        return False


    async def mine_block(self, miner_address: str) -> Dict:
        """Mine a new block"""
        # Calculate proof of work
        last_block = self.last_block
        proof = await self.async_proof_of_work(last_block)
        
        # Add mining reward transaction
        self.add_transaction(
            sender="0",
            recipient=miner_address,
            ewaste_items=[],
            transaction_type="mining_reward",
            status=EWasteStatus.PROCESSED
        )
        
        # Create new block
        previous_hash = self.hash(last_block)
        block = self.new_block(proof, previous_hash)
        
        return block

    def calculate_rewards(self, ewaste_items: List[EWasteItem]) -> float:
        """Calculate recycling rewards based on e-waste components"""
        total_reward = 0
        for item in ewaste_items:
            for component in item.components:
                reward_rate = self.recycling_rewards.get(component, 0)
                total_reward += reward_rate * item.weight
        return total_reward

    def transfer_ownership():
        pass
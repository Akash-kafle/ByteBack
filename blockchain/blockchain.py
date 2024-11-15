import asyncio
import hashlib
import json
import time
from typing import List, Dict, Set
from dataclasses import dataclass
from enum import Enum
from urllib.parse import urlparse
import aiohttp

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
        transaction = {
            'sender': sender,
            'recipient': recipient,
            'timestamp': time.time(),
            'type': transaction_type,
            'status': status.value,
            'ewaste_items': [vars(item) for item in ewaste_items],
            'environmental_impact': self._calculate_environmental_impact(ewaste_items)
        }
        
        self.current_transactions.append(transaction)
        return self.last_block['index'] + 1

    def _calculate_environmental_impact(self, ewaste_items: List[EWasteItem]) -> Dict:
    # Should consider different impact factors per component type
        impact_factors = {
        'CIRCUIT_BOARDS': 2.5,
        'BATTERIES': 3.0,
        'SCREENS': 1.5,
        'PLASTICS': 0.8,
        'METALS': 1.2,
        'HAZARDOUS': 4.0
        }
    
        total_impact = {
        'carbon_offset': 0,
        'energy_saved': 0,
        'landfill_reduced': 0
        }
    
        for item in ewaste_items:
            for component in item.components:
                factor = impact_factors.get(component, 1.0)
                total_impact['carbon_offset'] += item.weight * factor * 0.5
                total_impact['energy_saved'] += item.weight * factor * 0.3
                total_impact['landfill_reduced'] += item.weight
            
        return total_impact

    @property
    def last_block(self) -> Dict:
        """Get the last block in the chain"""
        return self.chain[-1]

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

    async def resolve_conflicts(self, session: aiohttp.ClientSession) -> bool:
        """Consensus algorithm: resolve conflicts by replacing chain with longest valid chain"""
        neighbours = self.nodes
        new_chain = None
        max_length = len(self.chain)
        
        for node in neighbours:
            async with session.get(f"http://{node}/chain") as response:
                if response.status == 200:
                    response_json = await response.json()
                    length = response_json['length']
                    chain = response_json['chain']
                    
                    if length > max_length and self.valid_chain(chain):
                        max_length = length
                        new_chain = chain
        
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

    def get_ewaste_history(self, item_id: str) -> List[Dict]:
        """Get the complete history of an e-waste item"""
        history = []
        for block in self.chain:
            for transaction in block['transactions']:
                if transaction.get('ewaste_items'):
                    for item in transaction['ewaste_items']:
                        if item['item_id'] == item_id:
                            history.append({
                                'timestamp': transaction['timestamp'],
                                'status': transaction['status'],
                                'handler': transaction['sender'],
                                'facility': transaction['recipient']
                            })
        return history
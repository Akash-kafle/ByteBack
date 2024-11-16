import asyncio
import hashlib
import json
import time
from typing import List, Dict, Set
from dataclasses import dataclass
from enum import Enum
from urllib.parse import urlparse
from pydantic import BaseModel
# from blockchain
import httpx


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
        # Impact coefficients per gram (from manufacturing to production phase)
        impact_factors = {
            'Aluminum': {'energy': 0.7, 'toxicity': 0.2, 'water': 0.5, 'carbon_emissions': 1.5},
            'Silicon': {'energy': 0.6, 'toxicity': 0.1, 'water': 0.4, 'carbon_emissions': 1.0},
            'Oxygen': {'energy': 0.1, 'toxicity': 0.0, 'water': 0.1, 'carbon_emissions': 0.2},
            'Copper': {'energy': 0.8, 'toxicity': 0.6, 'water': 0.7, 'carbon_emissions': 2.0},
            'Iron': {'energy': 0.4, 'toxicity': 0.1, 'water': 0.3, 'carbon_emissions': 0.8},
            'Carbon': {'energy': 0.5, 'toxicity': 0.3, 'water': 0.3, 'carbon_emissions': 1.2},
            'Nickel': {'energy': 1.0, 'toxicity': 0.9, 'water': 0.8, 'carbon_emissions': 2.5},
            'Lithium': {'energy': 0.9, 'toxicity': 0.8, 'water': 1.0, 'carbon_emissions': 2.2},
            'Cobalt': {'energy': 1.2, 'toxicity': 1.0, 'water': 1.1, 'carbon_emissions': 2.8},
            'Gold': {'energy': 1.5, 'toxicity': 0.5, 'water': 1.2, 'carbon_emissions': 3.0},
            'Silver': {'energy': 1.3, 'toxicity': 0.6, 'water': 1.1, 'carbon_emissions': 2.6},
            'Tantalum': {'energy': 1.2, 'toxicity': 0.7, 'water': 0.9, 'carbon_emissions': 2.4},
            'Tin': {'energy': 0.8, 'toxicity': 0.4, 'water': 0.5, 'carbon_emissions': 1.8},
            'Neodymium': {'energy': 1.4, 'toxicity': 0.6, 'water': 1.0, 'carbon_emissions': 2.7},
            'Palladium': {'energy': 1.5, 'toxicity': 0.5, 'water': 1.0, 'carbon_emissions': 2.9},
            'Platinum': {'energy': 1.5, 'toxicity': 0.6, 'water': 1.1, 'carbon_emissions': 3.1},
            'Yttrium': {'energy': 1.2, 'toxicity': 0.5, 'water': 0.8, 'carbon_emissions': 2.3},
            'Indium': {'energy': 1.3, 'toxicity': 0.5, 'water': 0.9, 'carbon_emissions': 2.6},
            'Gallium': {'energy': 1.1, 'toxicity': 0.4, 'water': 0.8, 'carbon_emissions': 2.0}
        }
    
        # Initialize total impact dictionary with all metrics
        total_impact = {
            'energy_saved': 0,
            'toxicity_prevented': 0,
            'water_preserved': 0,
            'carbon_emissions_prevented': 0,
            'total_weight_recycled': 0,
            'materials_recovered': {}
        }

        # Default impact values for unknown materials
        default_impact = {
            'energy': 0.5,
            'toxicity': 0.3,
            'water': 0.4,
            'carbon_emissions': 1.0
        }

        for item in ewaste_items:
            # Add to total weight
            total_impact['total_weight_recycled'] += item.weight

            # Calculate impact for each component
            for component in item.components:
                # Get impact factors for this component, or use defaults if not found
                component_factors = impact_factors.get(component, default_impact)
                
                # Calculate proportional weight (assuming equal distribution among components)
                component_weight = item.weight / len(item.components)
                
                # Update total impacts
                total_impact['energy_saved'] += component_weight * component_factors['energy']
                total_impact['toxicity_prevented'] += component_weight * component_factors['toxicity']
                total_impact['water_preserved'] += component_weight * component_factors['water']
                total_impact['carbon_emissions_prevented'] += component_weight * component_factors['carbon_emissions']
                
                # Track materials recovered
                if component in total_impact['materials_recovered']:
                    total_impact['materials_recovered'][component] += component_weight
                else:
                    total_impact['materials_recovered'][component] = component_weight

        # Round all numeric values to 3 decimal places
        for key, value in total_impact.items():
            if isinstance(value, (int, float)):
                total_impact[key] = round(value, 3)
            elif isinstance(value, dict):
                total_impact[key] = {k: round(v, 3) for k, v in value.items()}

        return total_impact

    @property
    def last_block(self) -> Dict:
        """Get the last block in the chain"""
        return self.chain[-1] if self.chain else None

    @property
    def free_amount():
        """This is """

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
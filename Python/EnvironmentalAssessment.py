import pandas as pd

# Read the data
data = pd.read_csv('E:\Code\HackFEST\e-waste\Python\smartPhone.csv')

# Impact coefficients per gram(from manufacturing to production phase)
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



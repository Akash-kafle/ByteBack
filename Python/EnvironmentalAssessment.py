import pandas as pd

# Read the data
data = pd.read_csv('E:\\Code\\HackFEST\\e-waste\\Python\\smartPhone.csv')

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

# Calculate the environmental impact score
def calculate_impact_score(row):
    element = row['Element']
    quantity = float(row['Quantity (gm)'])  # Convert quantity to float
    if element in impact_factors:
        factors = impact_factors[element]
        impact_score = (factors['energy'] + factors['toxicity'] + factors['water'] + factors['carbon_emissions']) * quantity
        return impact_score
    return 0

# Apply the calculation to each row
data['Impact Score'] = data.apply(calculate_impact_score, axis=1)

# Normalize the impact score to a scale of 1-10
max_score = data['Impact Score'].max()
data['Normalized Impact Score'] = (data['Impact Score'] / max_score) * 10
overall_score = data['Normalized Impact Score'].mean()

# Print the results
print(data[['Element', 'Quantity (gm)', 'Normalized Impact Score']])
print(f"Overall Environmental Impact Score: {overall_score:.2f}/10")

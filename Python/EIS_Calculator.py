import csv

def calculate_eis(input_csv, output_csv, material_conditions, material_ages, material_recyclability):
    """
    Calculate Material Impact (MI), Condition Adjustment (CA), Age Factor (AF), Recyclability Factor (RF),
    and Environmental Impact Score (EIS) for materials listed in a CSV file.
    
    Parameters:
        input_csv (str): Path to the input CSV file.
        output_csv (str): Path to the output CSV file.
        material_conditions (dict): Condition adjustment factors for materials (e.g., {"Aluminum": 0.8}).
        material_ages (dict): Age of materials in years (e.g., {"Aluminum": 2}).
        material_recyclability (dict): Recyclability factors for materials (e.g., {"Aluminum": 0.9}).
    """
    results = []
    
    # Open and read the input CSV file
    with open(input_csv, mode="r") as file:
        reader = csv.DictReader(file)
        
        # Process each row in the CSV
        for row in reader:
            element = row["Element"]
            impact_factor = float(row["Impact Factor (Approx.)"])
            quantity = float(row["Quantity (gm)"])
            
            # Calculate Material Impact (MI)
            mi = impact_factor * quantity
            
            # Get Condition Adjustment (CA)
            ca = material_conditions.get(element, 1.0)  # Default to 1.0 if not provided
            
            # Get Age Factor (AF)
            age = material_ages.get(element, 0)  # Default to 0 years if not provided
            af = max(0.5, 1 - (age * 0.05))  # Ensure AF is at least 0.5
            
            # Get Recyclability Factor (RF)
            rf = material_recyclability.get(element, 0.5)  # Default to 0.5 if not provided
            
            # Calculate Environmental Impact Score (EIS)
            eis = mi * ca * af * (1 - rf)
            
            # Append results
            results.append({
                "Element": element,
                "Impact Factor (Approx.)": impact_factor,
                "Quantity (gm)": quantity,
                "Material Impact (MI)": mi,
                "Condition Adjustment (CA)": ca,
                "Age Factor (AF)": af,
                "Recyclability Factor (RF)": rf,
                "Environmental Impact Score (EIS)": eis
            })
    
    # Write results to output CSV
    with open(output_csv, mode="w", newline="") as file:
        fieldnames = ["Element", "Impact Factor (Approx.)", "Quantity (gm)", 
                      "Material Impact (MI)", "Condition Adjustment (CA)", 
                      "Age Factor (AF)", "Recyclability Factor (RF)", 
                      "Environmental Impact Score (EIS)"]
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(results)

# Define input parameters
input_csv_path = "E:\Code\HackFEST\e-waste\Python\smartPhone.csv"
output_csv_path = "E:\Code\HackFEST\e-waste\Python\output.csv"
material_conditions = {
    "Aluminum": 0.8, "Silicon": 0.9, "Oxygen": 1.0, "Copper": 0.8, 
    "Iron": 0.9, "Carbon": 0.7, "Nickel": 0.8, "Lithium": 0.6, 
    "Cobalt": 0.6, "Gold": 0.9, "Silver": 0.9, "Tantalum": 0.7,
    "Tin": 0.8, "Neodymium": 0.7, "Palladium": 0.9, "Platinum": 0.9,
    "Yttrium": 0.7, "Indium": 0.6, "Gallium": 0.7
}
material_ages = {
    "Aluminum": 5, "Silicon": 3, "Oxygen": 0, "Copper": 2,
    "Iron": 4, "Carbon": 3, "Nickel": 6, "Lithium": 1,
    "Cobalt": 2, "Gold": 10, "Silver": 8, "Tantalum": 5,
    "Tin": 4, "Neodymium": 7, "Palladium": 12, "Platinum": 15,
    "Yttrium": 5, "Indium": 6, "Gallium": 3
}
material_recyclability = {
    "Aluminum": 0.9, "Silicon": 0.9, "Oxygen": 1.0, "Copper": 0.85, 
    "Iron": 0.9, "Carbon": 0.5, "Nickel": 0.8, "Lithium": 0.6, 
    "Cobalt": 0.6, "Gold": 0.95, "Silver": 0.95, "Tantalum": 0.7,
    "Tin": 0.85, "Neodymium": 0.6, "Palladium": 0.9, "Platinum": 0.95,
    "Yttrium": 0.6, "Indium": 0.5, "Gallium": 0.6
}

# Call the function
calculate_eis(input_csv_path, output_csv_path, material_conditions, material_ages, material_recyclability)

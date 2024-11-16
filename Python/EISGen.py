import csv
from typing import Dict, List, Tuple
import pandas as pd
from dataclasses import dataclass

@dataclass
class MaterialData:
    impact_factor: float
    quantity: float
    condition: float
    age: int
    recyclability: float

class DeviceEISCalculator:
    def __init__(self, csv_path: str):
        """Initialize calculator with path to materials CSV file."""
        self.csv_path = csv_path
        self.materials_data: Dict[str, MaterialData] = {}
        self.total_weight = 0
        self.total_mi = 0
        
        # Default material properties
        self.default_conditions = {
            "Aluminum": 0.8, "Silicon": 0.9, "Oxygen": 1.0, "Copper": 0.8,
            "Iron": 0.9, "Carbon": 0.7, "Nickel": 0.8, "Lithium": 0.6,
            "Cobalt": 0.6, "Gold": 0.9, "Silver": 0.9, "Tantalum": 0.7,
            "Tin": 0.8, "Neodymium": 0.7, "Palladium": 0.9, "Platinum": 0.9,
            "Yttrium": 0.7, "Indium": 0.6, "Gallium": 0.7
        }
        
        self.default_ages = {
            "Aluminum": 5, "Silicon": 3, "Oxygen": 0, "Copper": 2,
            "Iron": 4, "Carbon": 3, "Nickel": 6, "Lithium": 1,
            "Cobalt": 2, "Gold": 10, "Silver": 8, "Tantalum": 5,
            "Tin": 4, "Neodymium": 7, "Palladium": 12, "Platinum": 15,
            "Yttrium": 5, "Indium": 6, "Gallium": 3
        }
        
        self.default_recyclability = {
            "Aluminum": 0.9, "Silicon": 0.9, "Oxygen": 1.0, "Copper": 0.85,
            "Iron": 0.9, "Carbon": 0.5, "Nickel": 0.8, "Lithium": 0.6,
            "Cobalt": 0.6, "Gold": 0.95, "Silver": 0.95, "Tantalum": 0.7,
            "Tin": 0.85, "Neodymium": 0.6, "Palladium": 0.9, "Platinum": 0.95,
            "Yttrium": 0.6, "Indium": 0.5, "Gallium": 0.6
        }

    def load_materials(self) -> None:
        """Load and validate materials data from CSV file."""
        try:
            with open(self.csv_path, mode='r') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    element = row['Element']
                    self.materials_data[element] = MaterialData(
                        impact_factor=float(row['Impact Factor (Approx.)']),
                        quantity=float(row['Quantity (gm)']),
                        condition=self.default_conditions.get(element, 1.0),
                        age=self.default_ages.get(element, 0),
                        recyclability=self.default_recyclability.get(element, 0.5)
                    )
                    self.total_weight += float(row['Quantity (gm)'])
        except Exception as e:
            raise Exception(f"Error loading materials data: {str(e)}")

    def calculate_material_impacts(self) -> Dict[str, float]:
        """Calculate individual material impacts (MI)."""
        material_impacts = {}
        for element, data in self.materials_data.items():
            mi = data.impact_factor * data.quantity
            material_impacts[element] = mi
            self.total_mi += mi
        return material_impacts

    def calculate_weighted_factors(self) -> Tuple[float, float, float]:
        """Calculate weighted CA, AF, and RF factors."""
        weighted_ca = 0
        weighted_af = 0
        weighted_rf = 0

        for element, data in self.materials_data.items():
            weight_fraction = data.quantity / self.total_weight
            
            # Calculate Age Factor (AF)
            af = max(0.5, 1 - (data.age * 0.05))
            
            weighted_ca += data.condition * weight_fraction
            weighted_af += af * weight_fraction
            weighted_rf += data.recyclability * weight_fraction

        return weighted_ca, weighted_af, weighted_rf

    def calculate_eis(self) -> Dict:
        """Calculate final Environmental Impact Score and return detailed results."""
        self.load_materials()
        material_impacts = self.calculate_material_impacts()
        weighted_ca, weighted_af, weighted_rf = self.calculate_weighted_factors()
        
        # Calculate final EIS
        eis = self.total_mi * weighted_ca * weighted_af * (1 - weighted_rf)
        
        # Sort materials by impact
        sorted_impacts = dict(sorted(
            material_impacts.items(),
            key=lambda x: x[1],
            reverse=True
        ))

        return {
            "eis": eis,
            "total_weight": self.total_weight,
            "total_material_impact": self.total_mi,
            "weighted_factors": {
                "condition_adjustment": weighted_ca,
                "age_factor": weighted_af,
                "recyclability_factor": weighted_rf
            },
            "material_impacts": sorted_impacts
        }

    def generate_report(self) -> str:
        """Generate a detailed report of the EIS calculation."""
        results = self.calculate_eis()
        
        report = [
            "Environmental Impact Score (EIS) Analysis Report",
            "=" * 50,
            f"\nDevice Total Weight: {results['total_weight']:.2f} grams",
            f"Total Material Impact: {results['total_material_impact']:.2f}",
            f"Final EIS Score: {results['eis']:.2f}",
            "\nWeighted Factors:",
            f"- Condition Adjustment: {results['weighted_factors']['condition_adjustment']:.3f}",
            f"- Age Factor: {results['weighted_factors']['age_factor']:.3f}",
            f"- Recyclability Factor: {results['weighted_factors']['recyclability_factor']:.3f}",
            "\nTop 5 Contributing Materials:",
        ]
        
        for element, impact in list(results['material_impacts'].items())[:5]:
            material = self.materials_data[element]
            report.append(
                f"- {element}: Impact={impact:.2f} "
                f"(Quantity={material.quantity}g, "
                f"Impact Factor={material.impact_factor})"
            )
            
        return "\n".join(report)

# Example usage
if __name__ == "__main__":
    # Create calculator instance
    calculator = DeviceEISCalculator("E:\Code\HackFEST\e-waste\Python\smartPhone.csv")
    
    # Generate and print report
    print(calculator.generate_report())
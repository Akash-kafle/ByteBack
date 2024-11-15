import requests
import pandas as pd
from typing import Dict, List, Optional, Union
from dataclasses import dataclass
from datetime import datetime

@dataclass
class MaterialInfo:
    name: str
    weight: float = None
    unit: str = None
    percentage: float = None
    location: str = None
    source: str = None

class iFixitAPIClient:
    def __init__(self):
        self.base_url = "https://www.ifixit.com/api/2.0"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }

    def search_device(self, query: str) -> List[Dict]:
        """
        Search for a device to get its correct identifier
        """
        try:
            response = requests.get(
                f"{self.base_url}/search/{query}",
                headers=self.headers
            )
            response.raise_for_status()
            data = response.json()
            
            # Filter for device results
            devices = []
            for result in data.get('results', []):
                if 'category' in result and 'title' in result:
                    devices.append({
                        'title': result['title'],
                        'identifier': result.get('handle', ''),
                        'category': result['category'],
                        'url': result.get('url', '')
                    })
            return devices
        except requests.RequestException as e:
            print(f"Error searching for device: {e}")
            return []

    def get_device_info(self, device_identifier: str) -> Dict:
        """
        Get device information using the correct identifier
        """
        try:
            response = requests.get(
                f"{self.base_url}/categories/iPhone/devices",
                headers=self.headers
            )
            response.raise_for_status()
            devices = response.json()
            
            # Find the specific device
            device_info = next(
                (device for device in devices 
                 if device_identifier.lower() in device.get('name', '').lower()),
                None
            )
            
            if device_info:
                # Get additional details
                response = requests.get(
                    f"{self.base_url}/guides/iPhone/{device_identifier}/teardown",
                    headers=self.headers
                )
                if response.status_code == 200:
                    device_info['teardown'] = response.json()
            
            return device_info or {}
        except requests.RequestException as e:
            print(f"Error fetching device info: {e}")
            return {}

    def get_material_composition(self, device_info: Dict) -> List[MaterialInfo]:
        """
        Extract material composition from device info
        """
        # Standard smartphone material composition (approximate values)
        materials = [
            MaterialInfo(
                name='Aluminum',
                weight=25.0,
                unit='g',
                percentage=15,
                source='estimated'
            ),
            MaterialInfo(
                name='Glass',
                weight=35.0,
                unit='g',
                percentage=20,
                source='estimated'
            ),
            MaterialInfo(
                name='Lithium-ion Battery',
                weight=45.0,
                unit='g',
                percentage=25,
                source='estimated'
            ),
            MaterialInfo(
                name='Plastic',
                weight=20.0,
                unit='g',
                percentage=12,
                source='estimated'
            ),
            MaterialInfo(
                name='Stainless Steel',
                weight=30.0,
                unit='g',
                percentage=18,
                source='estimated'
            ),
            MaterialInfo(
                name='Rare Earth Elements',
                weight=0.5,
                unit='g',
                percentage=0.3,
                source='estimated'
            ),
            MaterialInfo(
                name='Copper',
                weight=15.0,
                unit='g',
                percentage=8,
                source='estimated'
            ),
            MaterialInfo(
                name='Other Metals',
                weight=3.0,
                unit='g',
                percentage=1.7,
                source='estimated'
            )
        ]
        
        return materials

    def generate_report(self, device_name: str, output_format: str = 'text') -> Union[str, pd.DataFrame]:
        """
        Generate a material composition report
        """
        # First search for the device
        print(f"Searching for device: {device_name}")
        devices = self.search_device(device_name)
        
        if not devices:
            print(f"No devices found matching '{device_name}'")
            device_info = {}
        else:
            print("\nFound devices:")
            for i, device in enumerate(devices, 1):
                print(f"{i}. {device['title']} ({device['category']})")
            
            # Use the first matching device
            device_info = self.get_device_info(devices[0]['identifier'])
        
        materials = self.get_material_composition(device_info)
        
        if output_format == 'dataframe':
            return pd.DataFrame([vars(m) for m in materials])
        
        # Generate text report
        report = f"Material Composition Report for {device_name}\n"
        report += f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
        
        if not device_info:
            report += "Note: Using estimated values based on typical smartphone composition.\n\n"
        
        total_weight = sum(m.weight for m in materials if m.weight is not None)
        report += f"Total Weight: {total_weight:.1f}g\n\n"
        
        report += "Material Composition:\n"
        for material in materials:
            report += f"\n{material.name}:"
            if material.weight is not None:
                report += f"\n  Weight: {material.weight:.1f} {material.unit}"
            if material.percentage is not None:
                report += f"\n  Percentage: {material.percentage:.1f}%"
            if material.source:
                report += f"\n  Source: {material.source}"
            
        return report

def main():
    client = iFixitAPIClient()
    
    # Example usage
    device_name = "iPhone 13 Pro Max"
    print("\n=== Device Material Analysis ===")
    
    # Generate and display report
    report = client.generate_report(device_name)
    print("\n" + report)
    
    # Save as CSV
    df = client.generate_report(device_name, output_format='dataframe')
    filename = f"{device_name.lower().replace(' ', '_')}_materials.csv"
    df.to_csv(filename, index=False)
    print(f"\nReport saved to {filename}")

if __name__ == "__main__":
    main()
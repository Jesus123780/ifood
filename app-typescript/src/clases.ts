class Vehicle {
  private brandName: string;
  private model: string;
  private color: string;
  constructor(b: string, model: string, color: string) {
     this.brandName = b;
     this.model = model;
     this.color = color;
  }

  driver(): void {
    console.log(`este es el vehículo ${this.brandName} modelo:  ${this.model}, color: ${this.color}`);
  }
}
const vehicle = new Vehicle("Mazda", 'Modelo 12234', 'Blanco');
vehicle.driver()
// vehicle.brandName = "toyota"
console.log(vehicle);
// let motorcycle = {
//   brandName: "kik",
//   drive: vehicle.drive,
// };

// console.log(motorcycle.drive());

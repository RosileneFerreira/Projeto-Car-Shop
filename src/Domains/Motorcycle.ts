import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(newMotorcycle: IMotorcycle) {
    super(newMotorcycle);
    this.category = newMotorcycle.category;
    this.engineCapacity = newMotorcycle.engineCapacity;
  }

  public setCategory(category: string) {
    this.category = category;
  }

  public getCategory() {
    return this.category;
  }

  public setEngineCapacity(engineCapacity: number) {
    this.engineCapacity = engineCapacity;
  }

  public getSeatsQty() {
    return this.engineCapacity;
  }
}

export default Motorcycle;
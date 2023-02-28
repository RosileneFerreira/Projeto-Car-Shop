import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import HttpException from '../Utils/HttpException';

class CarService {
  private createCarDomain(car: ICar): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async createCar(car: Omit<ICar, 'id'>) {
    // Criar instância da Model de Car usando Mongoose
    const carODM = new CarODM();
    // Inserir os dados no banco
    const newCar = await carODM.create(car);
    // Retornar os dados com o id
    return this.createCarDomain(newCar);
  }

  public async getAll() {
    const carODM = new CarODM();
    const cars = await carODM.getAll();
    const carsArray = cars.map((car) =>
      this.createCarDomain(car));
    return carsArray;
  }

  public async getById(id: string) {
    if (!isValidObjectId(id)) throw new HttpException(422, 'Invalid mongo id');

    const carODM = new CarODM();
    const car = await carODM.findById(id);
    if (!car) throw new HttpException(404, 'Car not found');
    const result = this.createCarDomain(car);
    return result;
  }

  public async updateCar(id: string, car: ICar) {
    if (!isValidObjectId(id)) throw new HttpException(422, 'Invalid mongo id');

    const carODM = new CarODM();
    const carUpdated = await carODM.update(id, car);
    if (!carUpdated) throw new HttpException(404, 'Car not found');
    const result = this.createCarDomain(carUpdated);
    return result;
  }
}

export default CarService;
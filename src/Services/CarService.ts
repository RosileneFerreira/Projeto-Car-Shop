import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

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
}

export default CarService;
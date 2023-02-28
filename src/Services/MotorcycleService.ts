import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import HttpException from '../Utils/HttpException';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async createMotorcycle(motorcycle: Omit<IMotorcycle, 'id'>) {
    // Criar instância da Model de Motorcycle usando Mongoose
    const motorcycleODM = new MotorcycleODM();
    // Inserir os dados no banco
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    // Retornar os dados com o id
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAll() {
    const motorcycleODM = new MotorcycleODM();
    const motorcycles = await motorcycleODM.getAll();
    const motorcyclesArray = motorcycles.map((motorcycle) =>
      this.createMotorcycleDomain(motorcycle));
    return motorcyclesArray;
  }

  public async getById(id: string) {
    if (!isValidObjectId(id)) throw new HttpException(422, 'Invalid mongo id');

    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.findById(id);
    if (!motorcycle) throw new HttpException(404, 'Motorcycle not found');
    const result = this.createMotorcycleDomain(motorcycle);
    return result;
  }

  public async updateMotorcycle(id: string, motorcycle: IMotorcycle) {
    if (!isValidObjectId(id)) throw new HttpException(422, 'Invalid mongo id');

    const motorcycleODM = new MotorcycleODM();
    const motorcycleUpdated = await motorcycleODM.update(id, motorcycle);
    if (!motorcycleUpdated) throw new HttpException(404, 'Motorcycle not found');
    const result = this.createMotorcycleDomain(motorcycleUpdated);
    return result;
  }
}

export default MotorcycleService;
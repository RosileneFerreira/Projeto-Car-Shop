import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async createMotorcycle(motorcycle: Omit<IMotorcycle, 'id'>) {
    // Criar instância da Model de Car usando Mongoose
    const motorcycleODM = new MotorcycleODM();
    // Inserir os dados no banco
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    // Retornar os dados com o id
    return this.createMotorcycleDomain(newMotorcycle);
  }
}

export default MotorcycleService;
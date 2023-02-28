import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Deveria cadastrar uma moto', function () {
  it('Deveria cadastrar uma moto com sucesso', async function () {
    // Arrange
    const motorcycleInput: IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const motorcycleOutput: Motorcycle = new Motorcycle(motorcycleInput);
  
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.createMotorcycle(motorcycleInput);

    // Assert
    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Listar todos as motos com sucesso', async function () {
    const getAllMotorcycle = [
      {
        id: '63fcc749b28dd61125202c7c',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        category: 4,
        engineCapacity: 5,
      },
      {
        id: '63fcc7ccb28dd61125202c7e',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        status: true,
        buyValue: 39,
        category: 2,
        engineCapacity: 5,
      },
    ];

    sinon.stub(Model, 'find').resolves(getAllMotorcycle);

    const service = new MotorcycleService();
    const result = await service.getAll();
    expect(result).to.be.deep.equal(getAllMotorcycle);
  });

  it('Listar uma moto com um id específico', async function () {
    const findMotorcycleById = {
      id: '63fcc7ccb28dd61125202c7e',
      model: 'Tempra',
      year: 1995,
      color: 'Black',
      status: true,
      buyValue: 39,
      category: 2,
      engineCapacity: 5,
    };

    sinon.stub(Model, 'findById').resolves(findMotorcycleById);

    const service = new MotorcycleService();
    const result = await service.getById('63fcc7ccb28dd61125202c7e');
    expect(result).to.be.deep.equal(findMotorcycleById);
  });

  it('Lançar erro quando uma moto não existe', async function () {
    sinon.stub(Model, 'findOne').onCall(0).resolves(null);

    try {
      const motorcycleService = new MotorcycleService();
      await motorcycleService.getById('63fcc7ccb28dd61125202c7e');        
    } catch (error) {
      expect((error as Error).message).to.equal('Motorcycle not found');
    }
  });

  it('Lançar erro caso o id seja inválido', async function () {
    const motorcycleService = new MotorcycleService();
    try {
      await motorcycleService.getById('1');
    } catch (erro) {
      expect((erro as Error).message).to.be.deep.equal('Invalid mongo id');
    }
  });

  it('Deveria atualizar uma moto com sucesso', async function () {
    // Arrange
    const motorcycleInput: IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Pink',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const motorcycleOutput: Motorcycle = new Motorcycle(motorcycleInput);
  
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.updateMotorcycle('63fcc7ccb28dd61125202c7e', motorcycleInput);

    // Assert
    expect(result).to.be.deep.equal(motorcycleOutput);

    // Lançar erro quando uma moto não existe para atualizar

    sinon.stub(Model, 'findOne').onCall(0).resolves(null);

    try {
      const carService = new MotorcycleService();
      await carService.updateMotorcycle('63fcc7ccb28dd61125202c7e', motorcycleInput);        
    } catch (error) {
      expect((error as Error).message).to.equal('Car not found');
    }

    // Lançar erro caso o id para atualização da moto seja inválido

    try {
      const carService = new MotorcycleService();
      await carService.updateMotorcycle('1', motorcycleInput);
    } catch (erro) {
      expect((erro as Error).message).to.be.deep.equal('Invalid mongo id');
    }
  });
  
  afterEach(function () { sinon.restore(); });
});
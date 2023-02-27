import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

describe('Deveria cadastrar um carro', function () {
  it('Deveria cadastrar um carro com sucesso', async function () {
    // Arrange
    const carInput: ICar = {
      model: 'C4',
      year: 2011,
      color: 'Black',
      status: true,
      buyValue: 20.000,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput: Car = new Car(carInput);
  
    sinon.stub(Model, 'create').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.createCar(carInput);

    // Assert
    expect(result).to.be.deep.equal(carOutput);
  });

  it('Listar todos os carros com sucesso', async function () {
    const getAllCars = [
      {
        id: '63fcc749b28dd61125202c7c',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '63fcc7ccb28dd61125202c7e',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        status: true,
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];

    sinon.stub(Model, 'find').resolves(getAllCars);

    const service = new CarService();
    const result = await service.getAll();
    expect(result).to.be.deep.equal(getAllCars);
  });

  it('Listar um carro com um id específico', async function () {
    const findCarById = {
      id: '63fcc7ccb28dd61125202c7e',
      model: 'Tempra',
      year: 1995,
      color: 'Black',
      status: true,
      buyValue: 39,
      doorsQty: 2,
      seatsQty: 5,
    };

    sinon.stub(Model, 'findById').resolves(findCarById);

    const service = new CarService();
    const result = await service.getById('63fcc7ccb28dd61125202c7e');
    expect(result).to.be.deep.equal(findCarById);
  });

  it('Lançar erro quando um carro não existe', async function () {
    sinon.stub(Model, 'findOne').onCall(0).resolves(null);

    try {
      const carService = new CarService();
      await carService.getById('63fcc7ccb28dd61125202c7e');        
    } catch (error) {
      expect((error as Error).message).to.equal('Car not found');
    }
  });

  it('Lançar erro caso o id seja inválido', async function () {
    const carService = new CarService();
    try {
      await carService.getById('1');
    } catch (erro) {
      expect((erro as Error).message).to.be.deep.equal('Invalid mongo id');
    }
  });

  afterEach(function () { sinon.restore(); });
});
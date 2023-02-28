import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const cars: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.createCar(cars);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAllCars() {
    try {
      const cars = await this.service.getAll();
      return this.res.status(200).json(cars);
    } catch (error) {
      this.next(error);
    }
  }

  public async getCarById() {
    const { id } = this.req.params;

    try {
      const car = await this.service.getById(id);
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const car: ICar = {
      ...this.req.body,
    };
    const { id } = this.req.params;

    try {
      const carUpdated = await this.service.updateCar(id, car);
      return this.res.status(200).json(carUpdated);
    } catch (error) {
      this.next(error);
    }
  }
}

export default CarController;
import ICar from '../Interfaces/ICar';

class Car {
  protected id?: string;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor(newCar: ICar) {
    this.id = newCar.id || '';
    this.model = newCar.model;
    this.year = newCar.year;
    this.color = newCar.color;
    this.status = newCar.status || false;
    this.buyValue = newCar.buyValue;
    this.doorsQty = newCar.doorsQty;
    this.seatsQty = newCar.seatsQty;
  }
  
  public setId(id: string) {
    this.id = id;
  }

  public getId() {
    return this.id;
  }

  public setModel(model: string) {
    this.model = model;
  }

  public getModel() {
    return this.model;
  }

  public setYear(year: number) {
    this.year = year;
  }

  public getYear() {
    return this.year;
  }

  public setColor(color: string) {
    this.color = color;
  }

  public getColor() {
    return this.color;
  }

  public setStatus(status: boolean) {
    this.status = status;
  }

  public getStatus() {
    return this.status;
  }

  public setBuyValue(buyValue: number) {
    this.buyValue = buyValue;
  }

  public getBuyValue() {
    return this.buyValue;
  }

  public setdoorsQty(doorsQty: number) {
    this.doorsQty = doorsQty;
  }

  public getdoorsQty() {
    return this.doorsQty;
  }

  public setSeatsQty(seatsQty: number) {
    this.seatsQty = seatsQty;
  }

  public getSeatsQty() {
    return this.seatsQty;
  }
}

export default Car;
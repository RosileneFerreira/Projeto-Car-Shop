import IIVehicle from './IVehicle';

interface ICar extends IIVehicle {
  doorsQty: number;
  seatsQty: number;
}

export default ICar;
import Producto from '../producto/producto';

export class Carrito {
  constructor(
    public producto: Producto,
    public cantidad: number = 1
  ) {}
}
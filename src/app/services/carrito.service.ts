import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Carrito } from '../models/carrito/carrito.model';
import Producto from '../models/producto/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoSubject = new BehaviorSubject<Carrito[]>([]);
  carrito$ = this.carritoSubject.asObservable();
  private cantidadSubject = new BehaviorSubject<number>(0);
  cantidad$ = this.cantidadSubject.asObservable();

  constructor() { }

  agregarProducto(producto: Producto): void {
    const currentCarrito = this.carritoSubject.value;
    const existingItem = currentCarrito.find(item => item.producto.id === producto.id);
    
    if (existingItem) {
      existingItem.cantidad += 1;
    } else {
      currentCarrito.push(new Carrito(producto));
    }
    
    this.carritoSubject.next([...currentCarrito]);
    this.cantidadSubject.next(currentCarrito.reduce((sum, item) => sum + item.cantidad, 0));
  }

  getCarrito(): Carrito[] {
    return this.carritoSubject.value;
  }

  eliminar(index: number): void {
    const currentCarrito = this.carritoSubject.value;
    if (index >= 0 && index < currentCarrito.length) {
      const updatedCarrito = currentCarrito.filter((_, i) => i !== index);
      this.carritoSubject.next(updatedCarrito);
      this.cantidadSubject.next(updatedCarrito.reduce((sum, item) => sum + item.cantidad, 0));
    }
  }

  limpiarCarrito(): void {
    this.carritoSubject.next([]);
    this.cantidadSubject.next(0);
  }

  actualizarCantidad(index: number, cantidad: number): void {
    const currentCarrito = this.carritoSubject.value;
    if (index >= 0 && index < currentCarrito.length) {
      currentCarrito[index].cantidad = cantidad;
      this.carritoSubject.next([...currentCarrito]);
      this.cantidadSubject.next(currentCarrito.reduce((sum, item) => sum + item.cantidad, 0));
    }
  }

  total(): number {
    const carrito = this.carritoSubject.value;
    return carrito.reduce((sum, item) => sum + (item.producto.price * item.cantidad), 0);
  }
}
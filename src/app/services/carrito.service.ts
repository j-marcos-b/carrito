import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoSubject = new BehaviorSubject<any[]>([]);
  carrito$ = this.carritoSubject.asObservable();
  private isBrowser: boolean;

  constructor(
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.inicializarCarrito();
    }
  }

  private inicializarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carritoSubject.next(JSON.parse(carritoGuardado));
    }
  }


  agregar(producto: any): void {
    const carritoActual = this.carritoSubject.value;
    const productoExistente = carritoActual.find(p => p.id === producto.id);
    
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carritoActual.push({...producto, cantidad: 1});
    }

    this.carritoSubject.next(carritoActual);
    if (this.isBrowser) {
      localStorage.setItem('carrito', JSON.stringify(carritoActual));
    }
    this.mostrarNotificacion('Producto agregado al carrito');
  }


  eliminar(index: number): void {
    const carritoActual = this.carritoSubject.value;
    carritoActual.splice(index, 1);
    this.carritoSubject.next(carritoActual);
    if (this.isBrowser) {
      localStorage.setItem('carrito', JSON.stringify(carritoActual));
    }
  }


  getCarrito(): any[] {
    return this.carritoSubject.value;
  }

  total(): number {
    return this.carritoSubject.value.reduce((sum, producto) => sum + (producto.price * producto.cantidad), 0);
  }

  limpiarCarrito(): void {
    this.carritoSubject.next([]);
    if (this.isBrowser) {
      localStorage.removeItem('carrito');
    }
  }

  actualizarCantidad(producto: any, cantidad: number): void {
    const carritoActual = this.carritoSubject.value;
    const productoExistente = carritoActual.find(p => p.id === producto.id);
    
    if (productoExistente) {
      productoExistente.cantidad = cantidad;
      this.carritoSubject.next(carritoActual);
      if (this.isBrowser) {
        localStorage.setItem('carrito', JSON.stringify(carritoActual));
      }
    }
  }



  private mostrarNotificacion(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
}

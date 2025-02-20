import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CarritoService } from './carrito.service';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  constructor(
    private carritoService: CarritoService,
    private http: HttpClient
  ) { }

  // Simula el proceso de pago
  procesarPago(datosPago: any): Observable<boolean> {
    // Validar que el carrito tenga productos
    if (this.carritoService.getCarrito().length === 0) {
      return of(false);
    }

    // Validar los datos de pago
    if (!this.validarDatosPago(datosPago)) {
      return of(false);
    }

    // Simular un retraso en el procesamiento del pago
    return new Observable<boolean>(observer => {
      setTimeout(() => {
        // Simular un 10% de probabilidad de fallo
        const exito = Math.random() < 0.9;
        observer.next(exito);
        observer.complete();
      }, 1500);
    });
  }

  // Validar datos de pago básicos
  validarDatosPago(datosPago: any): boolean {
    if (!datosPago) return false;

    // Validar nombre del titular
    if (!datosPago.nombreTitular || datosPago.nombreTitular.trim().length < 3) {
      return false;
    }

    // Validar número de tarjeta (16 dígitos)
    if (!/^\d{16}$/.test(datosPago.numeroTarjeta?.replace(/\s/g, ''))) {
      return false;
    }

    // Validar fecha de expiración (MM/YY)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(datosPago.fechaExpiracion)) {
      return false;
    }

    // Validar CVV (3 o 4 dígitos)
    if (!/^\d{3,4}$/.test(datosPago.cvv)) {
      return false;
    }

    return true;
  }

}

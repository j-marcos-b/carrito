import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { PagoService } from '../../services/pago.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {
  pagoForm = new FormGroup({
    nombreTitular: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    numeroTarjeta: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{16}$/)
    ]),
    fechaExpiracion: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)
    ]),
    cvv: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{3,4}$/)
    ])
  });

  constructor(
    private carritoService: CarritoService,
    private pagoService: PagoService,
    private router: Router
  ) { }

  async procesarPago(): Promise<void> {
    if (this.pagoForm.invalid) {
      return;
    }

    try {
      if (this.carritoService.getCarrito().length === 0) {
        alert('El carrito está vacío');
        return;
      }

      const pagoExitoso = await this.pagoService.procesarPago(this.pagoForm.value).toPromise();
      
      if (pagoExitoso) {
        this.carritoService.limpiarCarrito();
        this.router.navigate(['/confirmacion-pago']);
      } else {
        alert('Hubo un error al procesar el pago');
      }
    } catch (error) {
      console.error('Error procesando el pago:', error);
      alert('Ocurrió un error inesperado al procesar el pago');
    }
  }

  get total(): number {
    return this.carritoService.total();
  }

  get nombreTitular() { return this.pagoForm.get('nombreTitular'); }
  get numeroTarjeta() { return this.pagoForm.get('numeroTarjeta'); }
  get fechaExpiracion() { return this.pagoForm.get('fechaExpiracion'); }
  get cvv() { return this.pagoForm.get('cvv'); }
}

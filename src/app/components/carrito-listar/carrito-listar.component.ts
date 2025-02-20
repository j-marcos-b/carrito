import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito-listar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './carrito-listar.component.html',
  styleUrls: ['./carrito-listar.component.css']
})
export class CarritoListarComponent {
  listCarrito: any[] = [];

  constructor(
    public carritoService: CarritoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.listCarrito = this.carritoService.getCarrito();
    this.carritoService.carrito$.subscribe(() => {
      this.listCarrito = this.carritoService.getCarrito();
    });

  }

  eliminarItem(index: number): void {
    this.carritoService.eliminar(index);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  irAPago(): void {
    if (this.listCarrito.length === 0) {
      this.snackBar.open('Add products to cart before checkout', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }
    this.router.navigate(['/pago']);
  }


}

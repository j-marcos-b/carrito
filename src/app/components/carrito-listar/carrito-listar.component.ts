import { Component, inject, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Carrito } from '../../models/carrito/carrito.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito-lister',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito-listar.component.html',
  styleUrl: './carrito-listar.component.css'
})
export class CarritoListarComponent implements OnInit {
  public carritoService = inject(CarritoService);
  listCarrito: Carrito[] = [];

  ngOnInit(): void {
    this.getListCarrito();
    this.carritoService.carrito$.subscribe(() => {
      this.getListCarrito();
    });
  }


  getListCarrito() {
    this.listCarrito = this.carritoService.getCarrito();
  }

  eliminarItem(index: number) {
    this.carritoService.eliminar(index);
    this.getListCarrito();
  }

  onKeyDown(event: any) {
    event.preventDefault();
  }
}

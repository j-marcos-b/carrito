import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';
import { ProductoService } from '../../services/producto.service';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public carritoService = inject(CarritoService);
  private productoService = inject(ProductoService);
  private router = inject(Router);
  
  cantidad: number = 0;
  categorias: string[] = [];
  categoriaSeleccionada: string | null = null;
  terminoBusqueda: string = '';



  ngOnInit(): void {
    this.carritoService.cantidad$.subscribe(cantidad => {
      this.cantidad = cantidad;
    });
    
    this.productoService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  seleccionarCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
    this.router.navigate(['/catalogo'], { 
      queryParams: { categoria: categoria } 
    });
  }

  buscarProductos(termino: string) {
    if (termino.trim()) {
      this.router.navigate(['/catalogo'], {
        queryParams: { busqueda: termino }
      });
    }
  }
}

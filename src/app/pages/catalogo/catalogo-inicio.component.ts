import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import Producto from '../../models/producto/producto';
import { CarritoService } from '../../services/carrito.service';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { map } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-catalogo-inicio',
  standalone: true,
  imports: [CommonModule, FooterComponent, MatSnackBarModule],
  templateUrl: './catalogo-inicio.component.html',
  styleUrls: ['./catalogo-inicio.component.css']
})
export class CatalogoInicioComponent implements OnInit {
  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService, 
    private carritoService: CarritoService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getProductoById(id);
      } else {
        this.route.queryParams.subscribe(queryParams => {
          const categoria = queryParams['categoria'];
          const busqueda = queryParams['busqueda'];
          
          if (categoria) {
            this.getProductosPorCategoria(categoria);
          } else if (busqueda) {
            this.buscarProductos(busqueda);
          } else {
            this.getProductos();
          }
        });
      }
    });
  }

  getProductoById(id: string) {
    this.productoService.getProductoById(id).subscribe({
      next: (producto: Producto) => {
        this.productos = [producto];
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }

  getProductos() {
    this.productoService.getProductos().subscribe({
      next: (data: Producto[]) => {
        this.productos = data;
        console.log(this.productos);
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }

  getProductosPorCategoria(categoria: string) {
    this.productoService.getProductosPorCategoria(categoria).subscribe({
      next: (data: Producto[]) => {
        this.productos = data;
        console.log(this.productos);
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }

  buscarProductos(termino: string) {
    this.productoService.getProductos().pipe(
      map(productos => productos.filter(producto => 
        producto.title.toLowerCase().includes(termino.toLowerCase()) ||
        producto.description.toLowerCase().includes(termino.toLowerCase())
      ))
    ).subscribe({
      next: (data: Producto[]) => {
        this.productos = data;
        console.log(this.productos);
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }

  agregarProducto(item: Producto) {
    this.carritoService.agregar(item);
    this.snackBar.open('Producto agregado al carrito', 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  trackById(index: number, producto: Producto): string {
    return producto.id;
  }
}

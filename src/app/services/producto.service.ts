import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Producto from '../models/producto/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getProductoById(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  getProductosPorCategoria(categoria: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/category/${categoria}`);
  }

  buscarProductos(termino: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/search?q=${termino}`);
  }

  getCategorias(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

}

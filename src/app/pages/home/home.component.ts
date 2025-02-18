import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';


import { ProductoService } from '../../services/producto.service';
import Producto from '../../models/producto/producto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: Producto[] = [];
  isPaused = false;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.getFeaturedProducts();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.pauseCarousel();
  }

  @HostListener('mouseleave')  
  onMouseLeave() {
    this.resumeCarousel();
  }

  pauseCarousel() {
    this.isPaused = true;
    const carouselTrack = document.querySelector('.carousel-track') as HTMLElement;
    if (carouselTrack) {
      carouselTrack.style.animationPlayState = 'paused';
    }
  }

  resumeCarousel() {
    this.isPaused = false;
    const carouselTrack = document.querySelector('.carousel-track') as HTMLElement;
    if (carouselTrack) {
      carouselTrack.style.animationPlayState = 'running';
    }
  }

  nextSlide() {
    const carouselTrack = document.querySelector('.carousel-track') as HTMLElement;
    if (carouselTrack) {
      const currentTransform = window.getComputedStyle(carouselTrack).transform;
      const matrix = new DOMMatrix(currentTransform);
      const currentTranslateX = matrix.m41;
      const slideWidth = carouselTrack.clientWidth / 2;
      carouselTrack.style.transform = `translateX(${currentTranslateX - slideWidth}px)`;
    }
  }

  prevSlide() {
    const carouselTrack = document.querySelector('.carousel-track') as HTMLElement;
    if (carouselTrack) {
      const currentTransform = window.getComputedStyle(carouselTrack).transform;
      const matrix = new DOMMatrix(currentTransform);
      const currentTranslateX = matrix.m41;
      const slideWidth = carouselTrack.clientWidth / 2;
      carouselTrack.style.transform = `translateX(${currentTranslateX + slideWidth}px)`;
    }
  }

  getFeaturedProducts(): void {
    const categories = ['electronics', 'jewelery', "women's clothing"];
    
    categories.forEach(category => {
      this.productoService.getProductosPorCategoria(category).subscribe(products => {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        this.featuredProducts.push(randomProduct);
      });
    });
  }

  getCategoryRoute(product: Producto): string[] {
    return ['/catalogo', product.id.toString()];
  }
}

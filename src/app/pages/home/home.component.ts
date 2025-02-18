import { Component, OnInit, HostListener } from '@angular/core';
import { ViewportScroller } from '@angular/common';

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
  
  // Variables para controlar la visibilidad de las secciones
  showWelcome = false;
  showProducts = false;
  showInfo = false;
  showTestimonials = false;

  constructor(private productoService: ProductoService, 
              private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.getFeaturedProducts();
    this.checkScroll();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    const scrollPosition = this.viewportScroller.getScrollPosition()[1];
    
    // Mostrar secciones basado en la posición del scroll
    // Una vez que se muestran, permanecen visibles
    this.showWelcome = this.showWelcome || scrollPosition > 100;
    this.showProducts = this.showProducts || scrollPosition > 400;
    this.showInfo = this.showInfo || scrollPosition > 800;
    this.showTestimonials = this.showTestimonials || scrollPosition > 1200;
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

  getFeaturedProducts(): void {
    const categories = ['electronics', 'jewelery', "women's clothing"];
    categories.forEach(category => {
      this.productoService.getProductosPorCategoria(category)
        .subscribe(products => {
          const randomProduct = products[Math.floor(Math.random() * products.length)];
          this.featuredProducts.push(randomProduct);
        });
    });
  }
}

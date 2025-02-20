import { Routes } from '@angular/router';
import { CatalogoInicioComponent } from './pages/catalogo/catalogo-inicio.component';
import { CarritoListarComponent } from './components/carrito-listar/carrito-listar.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { PagoComponent } from './components/pago/pago.component';






export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'catalogo', component: CatalogoInicioComponent},
    {path: 'catalogo/:id', component: CatalogoInicioComponent},

    {path: 'carrito', component: CarritoListarComponent},
    {path: 'contacto' , component: ContactoComponent },
    { 
      path: 'pago',
      loadComponent: () => import('./components/pago/pago.component').then(m => m.PagoComponent)
    },
    {
      path: 'confirmacion-pago',
      loadComponent: () => import('./components/confirmacion-pago/confirmacion-pago.component').then(m => m.ConfirmacionPagoComponent)
    },

    {path: '**' , pathMatch: 'full', redirectTo: ''},


];

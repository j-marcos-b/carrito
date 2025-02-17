import { Routes } from '@angular/router';
import { CatalogoInicioComponent } from './pages/catalogo/catalogo-inicio.component';
import { CarritoListarComponent } from './components/carrito-listar/carrito-listar.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactoComponent } from './pages/contacto/contacto.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'catalogo', component: CatalogoInicioComponent},
    {path: 'catalogo/:id', component: CatalogoInicioComponent},

    {path: 'carrito', component: CarritoListarComponent},
    {path: 'contacto' , component: ContactoComponent },
    {path: '**' , pathMatch: 'full', redirectTo: ''},
];

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';

interface Contacto {
  nombre: string;
  email: string;
  mensaje: string;
}
@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule, FooterComponent],

  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  contacto: Contacto = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  enviarMensaje() {
    console.log('Mensaje enviado:', this.contacto);
    // Aquí iría la lógica para enviar el mensaje
    alert('Gracias por contactarnos. Tu mensaje ha sido enviado.');
    this.contacto = { nombre: '', email: '', mensaje: '' }; // Resetear el formulario
  }


}

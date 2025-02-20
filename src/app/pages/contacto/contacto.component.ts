import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';



@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FooterComponent],

  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  showSuccessMessage = false;
  
  contactoForm = new FormGroup({

    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    mensaje: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500)
    ])
  });


  get nombre() { return this.contactoForm.get('nombre'); }
  get email() { return this.contactoForm.get('email'); }
  get mensaje() { return this.contactoForm.get('mensaje'); }

  enviarFormulario() {
    if (this.contactoForm.valid) {
      this.showSuccessMessage = true;
      this.contactoForm.reset();
      
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    }
  }



}

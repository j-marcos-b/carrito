import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-confirmacion-pago',
    templateUrl: './confirmacion-pago.component.html',
    styleUrls: ['./confirmacion-pago.component.css'],
    standalone: true,
    imports: [RouterLink]
})
export class ConfirmacionPagoComponent {
  mensaje = '¡Pago realizado con éxito! Gracias por su compra.';
}

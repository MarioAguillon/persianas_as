import { Component } from '@angular/core';

@Component({
  selector: 'app-boton-whatsapp',
  imports: [],
  templateUrl: './boton-whatsapp.html',
  styleUrl: './boton-whatsapp.css'
})
export class BotonWhatsapp {
  public abrirWhatsApp(): void {
    const texto = encodeURIComponent('Hola Mario Davis, estuve visitando la página web de Persianas y Cortinas AS y me gustaría recibir asesoría personalizada.');
    window.open(`https://wa.me/573188676690?text=${texto}`, '_blank');
  }
}

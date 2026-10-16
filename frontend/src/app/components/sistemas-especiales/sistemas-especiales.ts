import { Component } from '@angular/core';

@Component({
  selector: 'app-sistemas-especiales',
  imports: [],
  templateUrl: './sistemas-especiales.html',
  styleUrl: './sistemas-especiales.css'
})
export class SistemasEspeciales {
  public contactarEspecial(tipo: string): void {
    const texto = encodeURIComponent(`Hola Mario Davis, estoy interesado en asesoría técnica para *${tipo}*. ¿Cuándo podríamos coordinar una visita técnica?`);
    window.open(`https://wa.me/573188676690?text=${texto}`, '_blank');
  }
}

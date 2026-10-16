import { Component, inject } from '@angular/core';
import { CotizadorService } from '../../services/cotizador.service';

@Component({
  selector: 'app-garantia',
  imports: [],
  templateUrl: './garantia.html',
  styleUrl: './garantia.css'
})
export class Garantia {
  public cotizadorService = inject(CotizadorService);

  public cerrarModal(): void {
    this.cotizadorService.modalGarantiaAbierto.set(false);
  }
}

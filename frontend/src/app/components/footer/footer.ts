import { Component, inject } from '@angular/core';
import { CotizadorService } from '../../services/cotizador.service';
import { INFO_EMPRESA } from '../../data/catalogo.data';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  private cotizadorService = inject(CotizadorService);
  public empresa = INFO_EMPRESA;

  public abrirModalGarantia(): void {
    this.cotizadorService.modalGarantiaAbierto.set(true);
  }

  public navegarA(id: string): void {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}

import { Component, inject } from '@angular/core';
import { CotizadorService } from '../../services/cotizador.service';
import { INFO_EMPRESA } from '../../data/catalogo.data';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {
  private cotizadorService = inject(CotizadorService);
  public empresa = INFO_EMPRESA;

  public irACotizador(): void {
    const el = document.getElementById('cotizador');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  public irACatalogo(): void {
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  public abrirModalGarantia(): void {
    this.cotizadorService.modalGarantiaAbierto.set(true);
  }
}

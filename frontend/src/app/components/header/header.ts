import { Component, inject, signal } from '@angular/core';
import { CotizadorService } from '../../services/cotizador.service';
import { INFO_EMPRESA } from '../../data/catalogo.data';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private cotizadorService = inject(CotizadorService);
  
  public empresa = INFO_EMPRESA;
  public menuAbierto = signal<boolean>(false);

  public toggleMenu(): void {
    this.menuAbierto.update(v => !v);
  }

  public abrirModalGarantia(): void {
    this.cotizadorService.modalGarantiaAbierto.set(true);
    this.menuAbierto.set(false);
  }

  public navegarA(id: string): void {
    this.menuAbierto.set(false);
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

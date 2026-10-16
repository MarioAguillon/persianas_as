import { Component } from '@angular/core';

@Component({
  selector: 'app-guia-medidas',
  imports: [],
  templateUrl: './guia-medidas.html',
  styleUrl: './guia-medidas.css'
})
export class GuiaMedidas {
  public tabActiva: 'fuera' | 'dentro' = 'fuera';

  public cambiarTab(tab: 'fuera' | 'dentro'): void {
    this.tabActiva = tab;
  }

  public irACotizador(): void {
    const el = document.getElementById('cotizador');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}

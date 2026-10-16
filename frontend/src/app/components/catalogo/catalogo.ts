import { Component, inject } from '@angular/core';
import { SISTEMAS_CATALOGO } from '../../data/catalogo.data';
import { CotizadorService } from '../../services/cotizador.service';
import { SistemaPersiana, TelaPersiana } from '../../models/persiana.model';

@Component({
  selector: 'app-catalogo',
  imports: [],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo {
  private cotizadorService = inject(CotizadorService);
  public sistemas: SistemaPersiana[] = SISTEMAS_CATALOGO;

  public cotizarSistema(sistema: SistemaPersiana, tela?: TelaPersiana): void {
    const primerItem = this.cotizadorService.items()[0];
    if (primerItem) {
      this.cotizadorService.actualizarItem(primerItem.id, {
        sistemaId: sistema.id,
        telaId: tela ? tela.id : sistema.telas[0].id
      });
    }

    const el = document.getElementById('cotizador');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  public abrirModalGarantia(): void {
    this.cotizadorService.modalGarantiaAbierto.set(true);
  }
}

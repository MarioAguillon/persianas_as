import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CotizadorService } from '../../services/cotizador.service';
import { SISTEMAS_CATALOGO } from '../../data/catalogo.data';
import { ItemCotizacion, SistemaPersiana } from '../../models/persiana.model';

@Component({
  selector: 'app-cotizador',
  imports: [CommonModule, FormsModule],
  templateUrl: './cotizador.html',
  styleUrl: './cotizador.css'
})
export class Cotizador {
  public cotizadorService = inject(CotizadorService);
  public sistemas: SistemaPersiana[] = SISTEMAS_CATALOGO;

  // Lista de ambientes predefinidos para agilizar al cliente
  public ambientesSugeridos = [
    'Sala',
    'Habitación Principal',
    'Habitación 2',
    'Habitación 3',
    'Estudio / Oficina',
    'Comedor',
    'Balcón'
  ];

  // Honeypot anti-spam (invisible para humanos)
  public honeypotField: string = '';

  // Obtener telas para un sistema dado
  public obtenerTelasDelSistema(sistemaId: string) {
    const sis = this.sistemas.find(s => s.id === sistemaId);
    return sis ? sis.telas : [];
  }

  // Modificar sistema de una persiana
  public onSistemaChange(item: ItemCotizacion, nuevoSistemaId: string): void {
    const telas = this.obtenerTelasDelSistema(nuevoSistemaId);
    this.cotizadorService.actualizarItem(item.id, {
      sistemaId: nuevoSistemaId,
      telaId: telas.length > 0 ? telas[0].id : ''
    });
  }

  // Modificar tela
  public onTelaChange(item: ItemCotizacion, nuevaTelaId: string): void {
    this.cotizadorService.actualizarItem(item.id, {
      telaId: nuevaTelaId
    });
  }

  // Modificar medidas
  public onMedidaChange(item: ItemCotizacion, ancho: number, alto: number): void {
    // Validar rangos seguros
    const anchoSeguro = Math.min(Math.max(Number(ancho) || 0.5, 0.4), 6.0);
    const altoSeguro = Math.min(Math.max(Number(alto) || 0.5, 0.4), 5.0);

    this.cotizadorService.actualizarItem(item.id, {
      anchoM: anchoSeguro,
      altoM: altoSeguro
    });
  }

  // Modificar ambiente
  public onAmbienteChange(item: ItemCotizacion, nuevoAmbiente: string): void {
    this.cotizadorService.actualizarItem(item.id, {
      ambiente: nuevoAmbiente
    });
  }

  // Agregar nueva ventana
  public agregarVentana(): void {
    this.cotizadorService.agregarItem();
  }

  // Eliminar ventana
  public eliminarVentana(id: string): void {
    this.cotizadorService.eliminarItem(id);
  }

  // Abrir WhatsApp con cotización
  public enviarCotizacionWhatsApp(): void {
    // Si el honeypot tiene contenido, es un bot, no hacemos nada
    if (this.honeypotField.trim() !== '') {
      console.warn('Bot detectado.');
      return;
    }

    const enlace = this.cotizadorService.generarEnlaceWhatsApp();
    window.open(enlace, '_blank');
  }

  // Abrir modal de garantía
  public abrirModalGarantia(): void {
    this.cotizadorService.modalGarantiaAbierto.set(true);
  }
}

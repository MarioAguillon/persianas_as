import { Injectable, signal, computed } from '@angular/core';
import { ItemCotizacion, ClienteLead, CotizacionCompleta } from '../models/persiana.model';
import { SISTEMAS_CATALOGO, INFO_EMPRESA } from '../data/catalogo.data';

@Injectable({
  providedIn: 'root'
})
export class CotizadorService {
  // Lista de items cotizados (Máximo 5 ventanas como solicitó Davis para seguridad)
  private itemsSignal = signal<ItemCotizacion[]>([
    this.crearItemVacio('Sala', 'sheer-elegance', 'sheer-screen', 1.80, 2.10)
  ]);

  // Datos del cliente
  private clienteSignal = signal<ClienteLead>({
    nombre: '',
    telefono: '',
    municipio: 'Mosquera',
    direccionAproximada: '',
    comentarios: ''
  });

  // Modal de garantía abierto/cerrado
  public modalGarantiaAbierto = signal<boolean>(false);

  // Computados
  public items = computed(() => this.itemsSignal());
  public cliente = computed(() => this.clienteSignal());
  public totalVentanas = computed(() => this.itemsSignal().length);
  public puedeAgregarMas = computed(() => this.itemsSignal().length < 5);

  public granTotalEstimado = computed(() => {
    return this.itemsSignal().reduce((acc, item) => acc + item.subtotal, 0);
  });

  public granTotalAreaM2 = computed(() => {
    return this.itemsSignal().reduce((acc, item) => acc + item.areaFacturableM2, 0);
  });

  // Crear un item nuevo con valores calculados
  public crearItemVacio(
    ambiente: string = 'Habitación',
    sistemaId: string = 'blackout',
    telaId: string = 'pinpoint-183',
    anchoM: number = 1.50,
    altoM: number = 1.80
  ): ItemCotizacion {
    const sistema = SISTEMAS_CATALOGO.find(s => s.id === sistemaId) || SISTEMAS_CATALOGO[0];
    const tela = sistema.telas.find(t => t.id === telaId) || sistema.telas[0];

    const areaReal = Number((anchoM * altoM).toFixed(2));
    const areaFacturable = Math.max(1.0, areaReal); // Regla mínima 1.0 m²
    const subtotal = Math.round(areaFacturable * tela.precioVentaM2);

    return {
      id: 'item_' + Math.random().toString(36).substring(2, 9),
      ambiente,
      sistemaId: sistema.id,
      telaId: tela.id,
      anchoM,
      altoM,
      areaCalculadaM2: areaReal,
      areaFacturableM2: areaFacturable,
      precioUnitarioM2: tela.precioVentaM2,
      subtotal
    };
  }

  // Agregar ventana (hasta 5 máximo)
  public agregarItem(): boolean {
    if (!this.puedeAgregarMas()) return false;
    const ambientesSugeridos = ['Habitación Principal', 'Habitación 2', 'Estudio', 'Comedor', 'Sala'];
    const idx = this.itemsSignal().length;
    const nombreAmbiente = ambientesSugeridos[idx] || `Ventana ${idx + 1}`;
    
    const nuevo = this.crearItemVacio(nombreAmbiente, 'blackout', 'pinpoint-183', 1.40, 1.60);
    this.itemsSignal.update(lista => [...lista, nuevo]);
    return true;
  }

  // Eliminar ventana
  public eliminarItem(id: string): void {
    if (this.itemsSignal().length <= 1) return; // Mantener al menos una
    this.itemsSignal.update(lista => lista.filter(i => i.id !== id));
  }

  // Actualizar un item
  public actualizarItem(id: string, cambios: Partial<ItemCotizacion>): void {
    this.itemsSignal.update(lista =>
      lista.map(item => {
        if (item.id !== id) return item;

        const updated = { ...item, ...cambios };
        
        // Buscar tela y precio
        const sistema = SISTEMAS_CATALOGO.find(s => s.id === updated.sistemaId) || SISTEMAS_CATALOGO[0];
        let tela = sistema.telas.find(t => t.id === updated.telaId);
        if (!tela) {
          tela = sistema.telas[0];
          updated.telaId = tela.id;
        }

        // Recalcular áreas y subtotales
        const areaReal = Number((updated.anchoM * updated.altoM).toFixed(2));
        const areaFacturable = Math.max(1.0, areaReal);
        const subtotal = Math.round(areaFacturable * tela.precioVentaM2);

        return {
          ...updated,
          precioUnitarioM2: tela.precioVentaM2,
          areaCalculadaM2: areaReal,
          areaFacturableM2: areaFacturable,
          subtotal
        };
      })
    );
  }

  // Actualizar datos de cliente
  public actualizarCliente(datos: Partial<ClienteLead>): void {
    this.clienteSignal.update(c => ({ ...c, ...datos }));
  }

  // Generar enlace dinámico de WhatsApp para cerrar la venta con Mario Davis
  public generarEnlaceWhatsApp(): string {
    const cliente = this.clienteSignal();
    const items = this.itemsSignal();
    const total = this.granTotalEstimado().toLocaleString('es-CO');

    let texto = `¡Hola Mario Davis! Mi nombre es *${cliente.nombre || 'un cliente interesado'}* de *${cliente.municipio}*.\n`;
    texto += `Acabo de realizar una cotización en la página web de *Persianas y Cortinas AS*:\n\n`;

    items.forEach((item, index) => {
      const sis = SISTEMAS_CATALOGO.find(s => s.id === item.sistemaId)?.nombre || item.sistemaId;
      const tela = SISTEMAS_CATALOGO.find(s => s.id === item.sistemaId)?.telas.find(t => t.id === item.telaId)?.nombre || item.telaId;
      
      texto += `🪟 *Ventana ${index + 1} (${item.ambiente}):*\n`;
      texto += `   • Sistema: ${sis} - ${tela}\n`;
      texto += `   • Medidas: ${item.anchoM.toFixed(2)}m ancho × ${item.altoM.toFixed(2)}m alto (${item.areaFacturableM2.toFixed(2)} m²)\n`;
      texto += `   • Subtotal est.: $ ${item.subtotal.toLocaleString('es-CO')} COP\n\n`;
    });

    texto += `💰 *TOTAL ESTIMADO (${items.length} ${items.length === 1 ? 'persiana' : 'persianas'}): $ ${total} COP*\n\n`;
    
    if (cliente.telefono) {
      texto += `📞 Mi teléfono de contacto: ${cliente.telefono}\n`;
    }
    
    texto += `Me gustaría agendar una visita técnica para rectificar medidas con láser y ver el catálogo físico de telas. ¿Qué disponibilidad tienes para ${cliente.municipio}?`;

    const encoded = encodeURIComponent(texto);
    return `https://wa.me/${INFO_EMPRESA.whatsappRaw}?text=${encoded}`;
  }
}

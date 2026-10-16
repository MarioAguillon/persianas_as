export interface TelaPersiana {
  id: string;
  nombre: string;
  descripcion: string;
  precioBaseSafra: number;
  precioVentaM2: number; // Precio con 50% de ganancia ya calculado
  caracteristicas: string[];
}

export interface SistemaPersiana {
  id: string;
  nombre: string;
  subtitulo: string;
  descripcion: string;
  idealPara: string;
  icono: string;
  imagen: string;
  telas: TelaPersiana[];
}

export interface ItemCotizacion {
  id: string;
  ambiente: string; // Ej: "Sala", "Habitación Principal", "Habitación 2"
  sistemaId: string;
  telaId: string;
  anchoM: number;
  altoM: number;
  areaCalculadaM2: number;
  areaFacturableM2: number; // Mínimo 1.0 m²
  precioUnitarioM2: number;
  subtotal: number;
}

export interface ClienteLead {
  nombre: string;
  telefono: string;
  municipio: 'Mosquera' | 'Funza' | 'Madrid' | 'Facatativá' | 'Bogotá' | 'Otro cercano';
  direccionAproximada?: string;
  comentarios?: string;
}

export interface CotizacionCompleta {
  cliente: ClienteLead;
  items: ItemCotizacion[];
  totalEstimado: number;
  fecha: Date;
}

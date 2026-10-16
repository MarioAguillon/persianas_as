import { SistemaPersiana } from '../models/persiana.model';

export const SISTEMAS_CATALOGO: SistemaPersiana[] = [
  {
    id: 'blackout',
    nombre: 'Blackout Enrollable',
    subtitulo: 'Bloqueo 100% de luz y aislamiento térmico',
    descripcion: 'El sistema predilecto para habitaciones y zonas de descanso. Elimina el resplandor exterior, protege tus muebles de los rayos UV y ayuda a regular la temperatura de la habitación.',
    idealPara: 'Dormitorios, estudios de grabación, salas de TV y habitaciones de niños.',
    icono: 'bi-moon-stars-fill',
    imagen: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    telas: [
      {
        id: 'pinpoint-183',
        nombre: 'Blackout Pinpoint 1.83m',
        descripcion: 'Tejido tricapa de alta densidad, textura lisa suave y respaldo bloqueador térmico. Ideal para ventanas estándar.',
        precioBaseSafra: 47990,
        precioVentaM2: 72000,
        caracteristicas: ['Oscuridad 100%', 'Aislamiento térmico', 'Fácil limpieza en seco', 'Ancho rollo 1.83m']
      },
      {
        id: 'pinpoint-250',
        nombre: 'Blackout Pinpoint 2.50m',
        descripcion: 'Formato especial extra ancho para ventanales de gran dimensión sin necesidad de uniones intermedias.',
        precioBaseSafra: 49510,
        precioVentaM2: 75000,
        caracteristicas: ['Sin uniones visibles', 'Para grandes ventanales', 'Bloqueo total UV', 'Ancho rollo 2.50m']
      }
    ]
  },
  {
    id: 'sheer-elegance',
    nombre: 'Sheer Elegance',
    subtitulo: 'Control de luz milimétrico y elegancia moderna',
    descripcion: 'Diseño vanguardista de doble tela con franjas opacas y translúcidas intercaladas. Te permite graduar la entrada de luz natural sin perder privacidad ni vista hacia el exterior.',
    idealPara: 'Salas principales, comedores, oficinas y zonas sociales modernas.',
    icono: 'bi-sun-fill',
    imagen: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    telas: [
      {
        id: 'sheer-screen',
        nombre: 'Sheer Screen',
        descripcion: 'Franjas de tejido microperforado de alta resistencia que filtran la radiación solar proporcionando una luz agradable y suave.',
        precioBaseSafra: 94080,
        precioVentaM2: 140000,
        caracteristicas: ['Filtro solar UV', 'Efecto Día y Noche', 'Acabado minimalista', 'Fácil accionamiento']
      },
      {
        id: 'sheer-screen-fina',
        nombre: 'Sheer Screen Fina',
        descripcion: 'Tejido extra delicado con entramado fino y suave caída, otorgando un aspecto contemporáneo y distinguido a tus ventanas.',
        precioBaseSafra: 94080,
        precioVentaM2: 140000,
        caracteristicas: ['Textura extra suave', 'Visibilidad exterior óptima', 'Diseño exclusivo Safra', 'Termosellado perimetral']
      }
    ]
  },
  {
    id: 'panel-japones',
    nombre: 'Panel Japonés',
    subtitulo: 'La solución perfecta para balcones y puertas-ventanas',
    descripcion: 'Paneles de tela rectangulares que se deslizan suavemente sobre un riel multidireccional. Especialmente diseñado para ventanas de piso a techo y salidas a terrazas.',
    idealPara: 'Puertas corredizas de balcón, ventanales de doble hoja y divisiones de ambiente.',
    icono: 'bi-door-open-fill',
    imagen: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    telas: [
      {
        id: 'screen-300',
        nombre: 'Screen 300 (Apertura 5%)',
        descripcion: 'Tejido técnico que filtra el 95% de los rayos UV permitiendo excelente paso de luz natural y visión hacia afuera.',
        precioBaseSafra: 80920,
        precioVentaM2: 121000,
        caracteristicas: ['Apertura solar 5%', 'Resistente a humedad', 'No se deforma ni decolora', 'Deslizamiento suave']
      },
      {
        id: 'screen-350',
        nombre: 'Screen 350 (Apertura 3%)',
        descripcion: 'Mayor privacidad y protección térmica contra el sol de la tarde sin oscurecer por completo el espacio.',
        precioBaseSafra: 79170,
        precioVentaM2: 119000,
        caracteristicas: ['Apertura solar 3%', 'Mayor protección contra calor', 'Ideal para poniente', 'Riel de 3 a 5 vías']
      }
    ]
  }
];

export const INFO_EMPRESA = {
  nombre: 'Persianas y Cortinas AS',
  distribuidor: 'Distribuidor Autorizado SAFRA',
  titular: 'Mario Davis Aguillón',
  telefono: '+57 318 8676690',
  whatsappRaw: '573188676690',
  municipioPrincipal: 'Mosquera, Cundinamarca',
  cobertura: ['Mosquera', 'Funza', 'Madrid', 'Facatativá', 'Bogotá D.C.'],
  garantiaSafra: {
    motores: '5 Años',
    telas: '3 Años',
    mecanismos: '1 Año',
    sicResolucion: 'Resolución 12667 de 2013 (Cornamusa de seguridad infantil instalada)'
  }
};

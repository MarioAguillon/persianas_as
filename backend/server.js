const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const { GoogleGenAI } = require('@google/genai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: '*', // Permitir conexión desde Angular local o Vercel
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '100kb' }));

// 1. Seguridad: Rate limit general
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 peticiones por IP
  message: { error: 'Demasiadas peticiones desde esta IP. Por favor intenta más tarde.' },
  standardHeaders: true,
  legacyHeaders: false
});
app.use(generalLimiter);

// 2. Seguridad: Rate limit estricto para el Chatbot de IA
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 15, // Máximo 15 mensajes por IP para proteger la cuota de IA
  message: {
    reply: 'Has alcanzado el límite de consultas automáticas por ahora para evitar saturación. Puedes comunicarte directamente a nuestra línea de WhatsApp al +57 3188676690 para resolver todas tus dudas.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Inicializar SDK de Gemini si existe la API Key
let aiClient = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

// Prompt del Sistema para "Persianas y Cortinas AS"
const SYSTEM_INSTRUCTION = `
Eres el Asistente Virtual y Asesor Experto en Decoración de "Persianas y Cortinas AS".
Tu objetivo es orientar a los clientes sobre persianas y cortinas con amabilidad, calidez y profesionalismo, fomentando que coticen en la página y agenden una visita técnica por WhatsApp.

INFORMACIÓN CLAVE DEL NEGOCIO:
- Empresa: Persianas y Cortinas AS (Distribuidor Autorizado SAFRA con fábrica en Bogotá).
- Equipo: Contamos con un equipo técnico especializado que realiza la rectificación de medidas con láser a domicilio y lleva el muestrario físico con más de 50 telas reales.
- Cobertura Prioritaria: Mosquera, Funza y Madrid (Cundinamarca). También atendemos Facatativá y Bogotá.
- Visita Técnica: Un técnico especializado asiste a tu domicilio sin compromiso para revisar las ventanas, rectificar medidas milimétricas y asesorar con muestrarios reales.

CATÁLOGO PRINCIPAL DE SISTEMAS:
1. BLACKOUT (Enrollable para dormitorios y descanso total, bloqueo 100% de luz y aislamiento térmico).
2. SHEER ELEGANCE (Día y noche, franjas alternadas, control milimétrico de luz y elegancia moderna para salas y comedores).
3. PANEL JAPONÉS (Para ventanales grandes, puertas corredizas y balcones).
4. SISTEMAS ESPECIALES Y MOTORIZACIÓN:
   - Motores eléctricos Wi-Fi con control remoto, techos corredizos, toldos para terrazas, pérgolas y perfiles Coverlight cero luz.

POLÍTICA DE PRECIOS:
- No proporciones valores por metro cuadrado de forma aislada. Invita amablemente al cliente a ingresar el ancho y alto de su ventana en el cotizador interactivo de la página web para obtener el valor estimado exacto de su proyecto, o a solicitar la visita técnica de un técnico especializado.

POLÍTICA DE GARANTÍA SAFRA:
- 5 Años en motores y automatismos.
- 3 Años en telas Screen, Sheer Screen y Blackout.
- 2 Años en telas poliéster.
- 1 Año en mecanismos y accesorios.
- SEGURIDAD INFANTIL: Cumplimiento de la Resolución 12667 de 2013 de la Superintendencia de Industria y Comercio (SIC). Todas las persianas manuales incluyen Cornamusa obligatoria para evitar accidentes con niños.

CÓMO MEDIR TU VENTANA:
- Por fuera del marco: Medir el marco y sumar 10 cm a cada lado y 10 a 15 cm arriba y abajo.
- Por dentro del marco: Medir en 3 puntos (arriba, medio, abajo) y restar 1 cm de tolerancia.
- Recordar al cliente que un técnico especializado rectifica las medidas en su domicilio.

REGLAS DE COMPORTAMIENTO:
- Responde siempre de forma concisa (máximo 2 a 3 párrafos), clara y cordial.
- Usa emojis elegantes de decoración (🪟, ☀️, ✨, 📏, 🏡).
- Si te preguntan sobre temas no relacionados con persianas, cortinas, medidas o decoración del hogar, responde cortésmente que tu especialidad son las persianas y cortinas y redirígelos amablemente.
- Cada respuesta debe invitar al cliente a utilizar el cotizador en pantalla o tocar el botón de WhatsApp (+57 3188676690) para que un técnico especializado agende su visita en Mosquera, Funza o Madrid.
`;

// Respuestas inteligentes de contingencia (si no hay API Key configurada aún)
function getLocalFallbackReply(message) {
  const msg = (message || '').toLowerCase();
  if (msg.includes('precio') || msg.includes('cuanto') || msg.includes('cuesta') || msg.includes('cotiz')) {
    return '¡Hola! El valor de tus persianas se calcula de acuerdo a las medidas exactas de tus ventanas. Puedes ingresar el ancho y alto en nuestro cotizador de la página web para ver el valor total aproximado al instante, o escribirnos por WhatsApp al +57 3188676690 para que un técnico especializado te visite con el muestrario físico.';
  }
  if (msg.includes('garant') || msg.includes('respaldo') || msg.includes('safra')) {
    return 'Como Distribuidores Autorizados de SAFRA, contamos con garantías líderes: 5 años en motores, 3 años en telas Screen, Sheer y Blackout, y 1 año en mecanismos. Además, todas nuestras instalaciones incluyen la Cornamusa de seguridad infantil reglamentaria por la SIC.';
  }
  if (msg.includes('medir') || msg.includes('medida') || msg.includes('ancho') || msg.includes('alto')) {
    return 'Para medir tu ventana: si va por fuera del marco, suma 10 cm a cada lado y 10-15 cm de alto. Si va dentro del marco, toma la medida exacta y resta 1 cm. Revisa nuestra sección "Cómo Medir" para ver el video explicativo, y no te preocupes: un técnico especializado rectifica las medidas en tu domicilio en Mosquera, Funza o Madrid.';
  }
  if (msg.includes('mosquera') || msg.includes('funza') || msg.includes('madrid') || msg.includes('bogota') || msg.includes('donde') || msg.includes('visita')) {
    return '¡Así es! Nuestra zona de atención prioritaria es Mosquera, Funza y Madrid, donde un técnico especializado realiza visitas a domicilio para llevarte el catálogo de telas reales y rectificar medidas con láser. También cubrimos Facatativá y Bogotá. Contáctanos por WhatsApp al +57 3188676690.';
  }
  return '¡Hola! Soy el Asistente Virtual de Persianas y Cortinas AS. Estoy aquí para asesorarte en la elección de tus persianas (Blackout, Sheer Elegance o Panel Japonés), explicarte cómo medir tu ventana y coordinar la visita de un técnico especializado en Mosquera, Funza o Madrid a través de nuestro WhatsApp +57 3188676690. ¿En qué espacio deseas instalar tus persianas?';
}

// Ruta de Salud
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Persianas y Cortinas AS API',
    geminiActive: !!process.env.GEMINI_API_KEY
  });
});

// Ruta de Chat
app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: 'Mensaje requerido.' });
    }

    // Si no hay API Key configurada, respondemos con el asesor de contingencia
    if (!aiClient) {
      const fallbackReply = getLocalFallbackReply(message);
      return res.json({ reply: fallbackReply });
    }

    // Llamada oficial a Google Gen AI SDK
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nPregunta del cliente: ${message}` }] }
      ]
    });

    const reply = response.text || getLocalFallbackReply(message);
    res.json({ reply });

  } catch (error) {
    console.error('Error procesando consulta con Gemini:', error);
    // En caso de error de cuota o red, no rompemos la experiencia del usuario
    const fallback = getLocalFallbackReply(req.body?.message);
    res.json({ reply: fallback });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de Persianas y Cortinas AS activo en el puerto ${PORT}`);
});

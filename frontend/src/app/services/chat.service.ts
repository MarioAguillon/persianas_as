import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

export interface MensajeChat {
  id: string;
  remitente: 'usuario' | 'asistente';
  texto: string;
  hora: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);
  // URL del backend (detecta si es local o producción)
  private apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000/api/chat' : '/api/chat';

  public abierto = signal<boolean>(false);
  public cargando = signal<boolean>(false);
  public mensajes = signal<MensajeChat[]>([
    {
      id: 'msg_inicio',
      remitente: 'asistente',
      texto: '¡Hola! Soy tu Asistente Virtual de Persianas y Cortinas AS. ¿Tienes dudas sobre qué tela te conviene (Blackout, Sheer o Panel) o cómo medir tu ventana? Pregúntame con confianza.',
      hora: this.obtenerHoraActual()
    }
  ]);

  public toggleChat(): void {
    this.abierto.update(v => !v);
  }

  public enviarMensaje(texto: string): void {
    const limpio = (texto || '').trim();
    if (!limpio || this.cargando()) return;

    // Agregar mensaje del usuario
    const msgUsuario: MensajeChat = {
      id: 'usr_' + Date.now(),
      remitente: 'usuario',
      texto: limpio,
      hora: this.obtenerHoraActual()
    };
    this.mensajes.update(list => [...list, msgUsuario]);
    this.cargando.set(true);

    // Enviar al backend de Express
    this.http.post<{ reply: string }>(this.apiUrl, {
      message: limpio,
      history: this.mensajes().map(m => ({
        role: m.remitente === 'usuario' ? 'user' : 'model',
        text: m.texto
      }))
    }).pipe(
      catchError(err => {
        console.warn('Error conectando con backend, usando respuesta local:', err);
        return of({
          reply: 'En Persianas y Cortinas AS contamos con respaldo oficial SAFRA (3 y 5 años de garantía). Si deseas que Mario Davis te visite en Mosquera, Funza o Madrid para rectificar medidas con láser y ver el catálogo físico, escríbele a su WhatsApp +57 3188676690.'
        });
      })
    ).subscribe(res => {
      this.cargando.set(false);
      const msgAsistente: MensajeChat = {
        id: 'bot_' + Date.now(),
        remitente: 'asistente',
        texto: res.reply || 'Estoy a tu disposición para ayudarte a cotizar tus persianas.',
        hora: this.obtenerHoraActual()
      };
      this.mensajes.update(list => [...list, msgAsistente]);
    });
  }

  private obtenerHoraActual(): string {
    const ahora = new Date();
    return ahora.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css'
})
export class Chatbot {
  public chatService = inject(ChatService);
  public inputMensaje: string = '';

  public sugerenciasRapidas = [
    '¿Qué persiana me recomiendas para habitación?',
    '¿Cómo se mide una ventana?',
    '¿Cuál es la garantía SAFRA?',
    '¿Hacen visita técnica en Mosquera o Funza?'
  ];

  public enviar(): void {
    if (!this.inputMensaje.trim()) return;
    const txt = this.inputMensaje;
    this.inputMensaje = '';
    this.chatService.enviarMensaje(txt);
  }

  public usarSugerencia(sug: string): void {
    this.chatService.enviarMensaje(sug);
  }

  public toggleChat(): void {
    this.chatService.toggleChat();
  }
}

import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Catalogo } from './components/catalogo/catalogo';
import { GuiaMedidas } from './components/guia-medidas/guia-medidas';
import { Cotizador } from './components/cotizador/cotizador';
import { SistemasEspeciales } from './components/sistemas-especiales/sistemas-especiales';
import { Garantia } from './components/garantia/garantia';
import { Chatbot } from './components/chatbot/chatbot';
import { BotonWhatsapp } from './components/boton-whatsapp/boton-whatsapp';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    Hero,
    Catalogo,
    GuiaMedidas,
    Cotizador,
    SistemasEspeciales,
    Garantia,
    Chatbot,
    BotonWhatsapp,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}

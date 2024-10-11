import { Component, Input, SimpleChange, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../counter/models/product.model';
import { CartService } from '../../services/cart.service';
import { RouterLinkWithHref } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  hideSideMenu = signal(true);
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  total = this.cartService.total;
  private sanitizer = inject(DomSanitizer);
  

  toogleSideMenu(){
    this.hideSideMenu.update(prevState => !prevState);
  }

  getSafeUrl(url: string) {
    if (url) {
      // Eliminar corchetes y comillas codificadas en la URL
      url = url.replace(/[\[\]"%22]/g, '');
  
      console.log('URL limpia:', url); // Verifica cómo queda la URL
      
      // Verificar si la URL ya tiene un protocolo (http o https)
      if (!/^https?:\/\//i.test(url)) {
        url = `https://${url}`;
      }
      
      // Marcar la URL como segura
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }
    return '';
  }
  
}

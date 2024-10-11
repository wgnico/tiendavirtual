import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Product } from '../../../shared/components/counter/models/product.model';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';




@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {  

  @Input({required: true}) product!: Product;

  @Output() addToCart = new EventEmitter(); 
  
  private sanitizer = inject(DomSanitizer);


  
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
  

  



  addToCartHandler(){    
    this.addToCart.emit(this.product);
  }
}

import { Component, Input, inject, signal } from '@angular/core';
import { ProductService } from '@shared/services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '@shared/components/counter/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export default class ProductDetailComponent {

  @Input() id?: string;
  product = signal<Product | null>(null);
  cover = signal<SafeUrl | string>('');
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  constructor(private sanitizer: DomSanitizer) { }


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
  


  ngOnInit(){
    if (this.id){
      this.productService.getOne(this.id)
      .subscribe({
        next: (product) => {
         this.product.set(product);
         if (product.images.length > 0){
          this.cover.set(this.getSafeUrl(product.images[0]))
         }
        }
      })
    }    
  }

  changeCover(newImg: string){
    this.cover.set(newImg);
  }

  addToCart(){
    const product = this.product();
    if (product) {
      this.cartService.addToCart(product)
    }
    
  }


}

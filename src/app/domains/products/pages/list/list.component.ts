import { Component, Input, SimpleChange, SimpleChanges, inject, signal } from '@angular/core';
import { ProductComponent } from './../../components/product/product.component'
import { Product } from './../../../shared/components/counter/models/product.model'
import { CommonModule } from '@angular/common';
import {HeaderComponent} from '@shared/components/header/header.component'
import { CartService } from '../../../shared/services/cart.service';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/components/counter/models/category.models';
import { RouterLinkWithHref } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {

  products = signal<Product[]>([]);
  categories = signal <Category[]>([]);
  private cartService = inject(CartService); 
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  @Input() category_id?: string;
  private sanitizer = inject(DomSanitizer);

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  


  ngOnInit(){        
    this.getCategories();
    this.getProducts();
  }

  ngOnChages(changes: SimpleChanges){
    this.getProducts();
  }


  addToCart(product: Product){
    this.cartService.addToCart(product)
  }


  private getProducts(){
    this.productService.getProducts(this.category_id)
    .subscribe({
      next:(products) => {
        this.products.set(products)        
      },
      error: () => {
      }
    })
  }


  private getCategories(){
    this.categoryService.getAll()
    .subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: () => {        
      }
    })
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '@shared/components/counter/models/category.models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);

  constructor() { }

  getAll(){
    return this.http.get<Category[]>(`https://api.escuelajs.co/api/v1/categories`);
  }

}

import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = []

  constructor(private readonly productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productsService.getAll().subscribe({
      next: (products: Product[]) => this.products = products,
      error: (err: any) => console.log(err)
    });
  }

  deleteProduct(id?: string) {
    if (!id) return;

    this.productsService.delete(id).subscribe({
      complete: () => this.getProducts(),
      error: (error: any) => console.log(error)
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  isEdit: boolean = false;
  product: Product = {
    name: '',
    description: '',
    price: 0,
    imageURL: ''
  }

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly productsService: ProductsService
  ) { }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params

    if (id) {
      this.getProductById(id);
    }
  }

  getProductById(id: string) {
    this.productsService.getById(id).subscribe({
      next: (product: Product | null) => {
        if (!product) return;
        this.product = product;
        this.isEdit = true;
      },
      error: (err: any) => console.log(err)
    });
  }

  saveProduct() {
    !this.isEdit ? this.createProduct() : this.updateProduct();
  }

  createProduct() {
    if (this.isEdit || this.product._id) return;

    this.productsService.create(this.product).subscribe({
      complete: () => this.router.navigate(['/products/list']),
      error: (error: any) => console.log(error)
    });
  }

  updateProduct() {
    if (!this.isEdit || !this.product._id) return;

    const id: string = this.product._id

    delete this.product._id;
    delete this.product.createdAt;

    this.productsService.update(id, this.product).subscribe({
      complete: () => this.router.navigate(['/products/list']),
      error: (error: any) => console.log(error)
    });
  }

}

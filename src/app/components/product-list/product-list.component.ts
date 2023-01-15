import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = []

  constructor(
    private readonly productsService: ProductsService,
    private readonly modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productsService.getAll().subscribe({
      next: (products: Product[]) => this.products = products,
      error: (err: any) => console.log(err)
    });
  }

  editProduct(id?: string) {
    if (!id) return;

    const modalRef = this.modalService.open(ProductFormComponent);
    modalRef.componentInstance.id = id;
  }

  deleteProduct(id?: string) {
    if (!id) return;

    this.productsService.delete(id).subscribe({
      complete: () => this.getProducts(),
      error: (error: any) => console.log(error)
    });
  }

}

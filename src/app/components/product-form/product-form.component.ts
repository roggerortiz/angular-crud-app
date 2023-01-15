import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() id: string = "";

  isEdit: boolean = false;

  product: Product = {
    name: '',
    description: '',
    price: 0,
    imageURL: ''
  }

  constructor(
    private readonly router: Router,
    private readonly productsService: ProductsService,
    private readonly modalService: NgbModal,
    public productModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if (this.id) {
      this.getProductById(this.id);
    }
  }

  open(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'productModalLabel',
      backdrop: 'static',
      centered: true,
      keyboard: false,
      scrollable: true,
    });
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
      complete: () => this.router.navigate(['/products']),
      error: (error: any) => console.log(error)
    });
  }

  updateProduct() {
    if (!this.isEdit || !this.product._id) return;

    const id: string = this.product._id

    delete this.product._id;
    delete this.product.createdAt;

    this.productsService.update(id, this.product).subscribe({
      complete: () => this.router.navigate(['/products']),
      error: (error: any) => console.log(error)
    });
  }

}

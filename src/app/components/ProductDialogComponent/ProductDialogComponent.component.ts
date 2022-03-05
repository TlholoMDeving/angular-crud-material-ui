import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/_Interfaces/IProduct';
import { ProductsService } from 'src/app/_Services/products.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-ProductDialogComponent',
  templateUrl: './ProductDialogComponent.component.html',
  styleUrls: ['./ProductDialogComponent.component.scss'],
})
export class ProductDialogComponentComponent implements OnInit {
  productRating: number[] = [1, 2, 3];
  productFrom!: FormGroup;
  isEditAction: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private dialogRef: MatDialogRef<ProductDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: IProduct
  ) {}

  ngOnInit() {
    this.prepareForm();
    this.getAlreadyExistingProduct();
  }

  private getAlreadyExistingProduct() {
    if (!this.editData) return;
    this.isEditAction = true;
    const timestampSeconds = Object.values(this.editData.date)[0];
    this.productFrom.patchValue({
      productName: this.editData.productName,
      category: this.editData.category,
      rating: this.editData.rating,
      date: new Date(timestampSeconds * 1000),
      price: this.editData.price,
      comment: this.editData.comment,
    });
  }

  private prepareForm() {
    this.productFrom = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      rating: ['', Validators.required],
      date: [undefined, Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      comment: ['', Validators.required],
    });
  }

  productManagement() {
    if (!this.productFrom.valid) return;
    if (!this.editData) {
      let product = this.productFrom.value as IProduct;
      this.productsService.createProduct(product).subscribe({
        next: (res) => {
          alert('Product added successfully');
          this.productFrom.reset();
          this.dialogRef.close();
        },
        error: (error) => {
          alert('Error occured while adding product');
        },
      });
    } else {
      this.updateProduct();
    }
  }
  private updateProduct() {
    this.productsService
      .updateProduct(this.productFrom.value as IProduct, this.editData.id)
      .subscribe({
        next: (res) => {
          alert('Product updated successfully');
          this.productFrom.reset();
          this.dialogRef.close();
        },
        error: (error) => {
          alert('Error occured while updating product');
        },
      });
  }
}

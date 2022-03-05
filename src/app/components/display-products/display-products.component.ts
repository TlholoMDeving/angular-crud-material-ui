import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from 'src/app/_Interfaces/IProduct';
import { ProductsService } from 'src/app/_Services/products.service';
import { ProductDialogComponentComponent } from '../ProductDialogComponent/ProductDialogComponent.component';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.scss'],
})
export class DisplayProductsComponent implements OnInit {
  displayedColumns: string[] = [
    'productName',
    'category',
    'rating',
    'date',
    'price',
    'comment',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService
      .getProductsList()
      .snapshotChanges()
      .subscribe({
        next: (res) => {
          const currentItems = res.map((item) => {
            return {
              id: item.payload.doc.id,
              ...(item.payload.doc.data() as {}),
            };
          });
          this.dataSource = new MatTableDataSource(currentItems);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => {
          alert('Error occured while fetching records! ');
        },
      });
  }

  editProduct(row: any) {
    this.dialog.open(ProductDialogComponentComponent, {
      width: '30%',
      data: row,
    });
  }

  deleteProduct(row: any)
  {
    this.productsService.deleteProduct(row).subscribe({
      next: (res) => {
        alert('Product delete successfully');
      },
      error: (error) => {
        alert('Error occured while deleting product');
      },
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

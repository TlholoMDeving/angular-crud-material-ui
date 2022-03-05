import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';
import { IProduct } from '../_Interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private angularFirestore: AngularFirestore) {}

  getProductDoc(id: string) {
    return this.angularFirestore
      .collection('products-collection')
      .doc(id);
  }

  getProductsList() {
    return this.angularFirestore.collection('products-collection');
  }

  createProduct(product: IProduct) {
    return from(
      this.angularFirestore.collection('products-collection').add(product)
    );
  }

  deleteProduct(product: IProduct) {
    return from(
      this.angularFirestore
        .collection('products-collection')
        .doc(product.id)
        .delete()
    );
  }

  updateProduct(product: IProduct, id: string) {
    return from(
      this.angularFirestore
        .collection('products-collection')
        .doc(id)
        .update({
          ...product,
        })
    );
  }
}

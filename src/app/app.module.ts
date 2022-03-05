import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HeaderComponent } from './components/layout/header/header.component';
import { ProductDialogComponentComponent } from './components/ProductDialogComponent/ProductDialogComponent.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DisplayProductsComponent } from './components/display-products/display-products.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductDialogComponentComponent,
    DisplayProductsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

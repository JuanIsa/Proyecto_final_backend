import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateAppRoutingModule } from './private-app-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CardComponent } from './components/card/card.component';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    HomePageComponent,
    CartPageComponent,
    CardComponent,
    FormComponent,
    NavbarComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PrivateAppRoutingModule
  ]
})
export class PrivateAppModule { }

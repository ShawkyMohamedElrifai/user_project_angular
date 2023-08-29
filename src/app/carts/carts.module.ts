import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Product1Component } from '../products/components/product1/product1.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CartsComponent } from './components/carts/carts.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
  
  
    CartsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule
    
    
  ],
  exports:[
    CartsComponent
    
  ]
  
})
export class CartsModule { }

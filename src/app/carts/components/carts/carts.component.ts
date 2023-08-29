import { Component ,OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { tick } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from '../../../products/services/products.service';
@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit  {
 constructor ( private service:CartsService , private build:FormBuilder , private productService:ProductsService){ }
 
 carts:any [] = [];
  products:any []= []
   form!:FormGroup
   details:any
   total =0
 ngOnInit(): void {
  this.form = this.build.group({
    start :[''],
    end:['']

  })
  this.getAllCarts()
 }
  
   getAllCarts(){
    this.service.getAllCarts().subscribe((res:any)=>{
      this.carts =res 
    })
   }
 
   applyFilter(){
    let date = this.form.value
    this.service.getAllCarts(date).subscribe((res:any)=>{
      this.carts =res 
   })


}
deleteCart(id:number){
   this.service.deleteCart(id).subscribe(res => {
    this.getAllCarts()
    alert("cart deleted success")
   })
}


view(index:number
  ){
    this.details = this.carts[index]
    for(let x in this.details.products){
     this.productService.getproductById(this.details.products[x].productId).subscribe(res =>{
      this.products.push({item:res, quantity:this.details.products[x].quantity})
     })
    }
}
  
}
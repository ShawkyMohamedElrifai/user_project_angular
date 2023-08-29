import { Component ,OnInit} from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { isNgTemplate } from '@angular/compiler';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  productArr:any = []
  categoriesArr: any = []
  cartProducts:any =[]
  base64:any ='';
  form!:FormGroup
  constructor(private service:ProductsService ,private build:FormBuilder){}

  ngOnInit():void{  
    this.getAllProducts()
    this.getAllCategories()
    this.form = this.build.group({
      title: ['', [Validators.required]],
      price:['', [Validators.required]],
      description:['', [Validators.required]],
      image:['', [Validators.required]],
      category:['', [Validators.required]]
    })

}
getAllProducts() {
  
  this.service.getAllData().subscribe(xyz => {
  
    this.productArr = xyz
    
  } , error => {
   
    alert(error)
  })
}
getAllCategories() {
  
  this.service.getAllCategories().subscribe(res => {
    // console.log(res)
    this.categoriesArr = res
  
  } , error => {
   
    alert(error)
  })
}
filterCategory(event:any){

  let value = event.target.value;
  (value == "all")? this.getAllProducts() : this.getProductsCategory(value)
   
  
}
getProductsCategory(keyword :string){
  
  this.service.getproductByCategory(keyword).subscribe((res:any)=>{
   
    this.productArr = res
  })
}
 
reciveCategory(event:any){
 

}
addToCart(event:any){
  if("cart" in localStorage){
    this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
    let exits = this.cartProducts.find((item:any) => item.id ==event.id)
     // let exits = this.cartProducts.find((item: { item: { id: any; }; }) => item.item.id ==event.item.id)
    if(exits){
      alert("product is already in your  cart")
    }else{
      this.cartProducts.push(event)
      localStorage.setItem("cart",JSON.stringify(this.cartProducts))
  
    }
   }else{
    this.cartProducts.push(event)
    localStorage.setItem("cart" ,JSON.stringify(this.cartProducts))
  }

}
getImagePath(event:any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      this.base64 = reader.result;
      this.form.get('image')?.setValue(this.base64)
      
    }

}
addProduct(){
    const model =  this.form.value
    this.service.createProduct(model).subscribe(res=>{
      alert("Add Product Success")
    })
}
getSelectedCategory(event:any){
  this.form.get('category')?.setValue(event.target.value)
  console.log(this.form)
}

update(item:any){
   this.form.get('title')?.setValue(item.title)
   this.form.get('description')?.setValue(item.description)
   this.form.get('category')?.setValue(item.category)
   this.form.get('price')?.setValue(item.price)
  this.form.get('image')?.setValue(item.image)
  this.base64 = item.image

}
}


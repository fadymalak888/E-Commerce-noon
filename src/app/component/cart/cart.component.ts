import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICart } from 'src/app/model/Icart';
import { IOrderLocation, ISuccessOrder } from 'src/app/model/Iorder';
import { UserToken } from 'src/app/model/user';
import { CartService } from 'src/app/services/cart.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @ViewChild('close') closeBtn!: ElementRef
  
  activatedCartId:number = 0;
  activatedCart:ICart; 
  totalPrice:number=0;

  OrderLocation:IOrderLocation;
  successOrder:ISuccessOrder 


  constructor(private activatedroute:ActivatedRoute , private cartServices:CartService,private inventoryServices:InventoryService , private router:Router,private toastr: ToastrService) { 
    this.OrderLocation={
      street: "",
      city: "",
      postalCode: ""
    }
   this.successOrder = null
    
    //intitlization for activated card
    this.activatedroute.paramMap.subscribe(cart=>{
      this.activatedCartId = Number(cart.get("cartId"))
     this.getCartById(this.activatedCartId);
    })
  }

  ngOnInit(): void {

  }

  calcTotalPrice(){
     this.totalPrice = 0; 
     for(let i = 0 ; i< this.activatedCart.cartItems.length;i++){
          this.totalPrice +=  Number(this.activatedCart.cartItems[i].price)*Number(this.activatedCart.cartItems[i].quantity) 
     }

  }

  removeItem(cartId:number , itemId:number){
      this.cartServices.RemoveItemFromCart(cartId,itemId).subscribe(next=>{
        this.getCartById(this.activatedCartId)
      }
      ,err=>{
          alert("error")
      },()=>{
      }
      )
  }

  getCartById(cartId:number){
    this.cartServices.getCartById(cartId).subscribe(cartdata=>{
      this.activatedCart = cartdata 
      if(this.activatedCart.cartItems.length ==0){this.totalPrice = 0}

      for(let i =0 ; i<this.activatedCart.cartItems.length ; i++){
          this.inventoryServices.getInventoryById(this.activatedCart.cartItems[i].inventoryId).subscribe(inv=>{
            this.activatedCart.cartItems[i].medias = inv.medias;
            this.activatedCart.cartItems[i].price = inv.price;
            this.activatedCart.cartItems[i].avalibleQuantity = inv.quantity;
            this.activatedCart.cartItems[i].description = inv.product.description;
            this.activatedCart.cartItems[i].color = inv.color;
            this.activatedCart.cartItems[i].size = inv.size;
            this.activatedCart.cartItems[i].avalibleQuantityArr = [];
            for(let j = 1 ; j<=inv.quantity ; j++){
              this.activatedCart.cartItems[i].avalibleQuantityArr.push(j)
            }
            //cal total price 
            this.calcTotalPrice();
            
          })
      }
    })
  }


  MakeOrder(){
      // console.log(this.OrderLocation,this.activatedCartId  ,  localStorage.getItem('token'))
     this.cartServices.Order(this.OrderLocation,this.activatedCartId).subscribe(data=>{
      console.log(" order done" , data)
      this.router.navigate(['cart/'+ +this.activatedCartId])
      this.closeBtn.nativeElement.click();
      this.successOrder = data;
      console.log("success orderrrrrrrrrrrrrrrr",this.successOrder)
      this.toastr.success('', ' Order Done');
     }
     ,err=>{
      this.toastr.error(err, 'there is some thing wrong try Agin later');
     }
     )
    }
}

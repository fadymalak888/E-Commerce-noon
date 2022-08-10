import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICart } from '../model/Icart';
import { IOrderLocation, ISuccessOrder } from '../model/Iorder';

@Injectable({
  providedIn: 'root'
})
export class CartService {
httpOption:{}
  constructor(private httpClient:HttpClient) { 
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}` ?? ""
      })
    }

  }
  getCartById(cartId:number):Observable<ICart>{
      return this.httpClient.get<ICart>(`${environment.APIURL}/Cart/${+cartId}`)
  }

  addToCartS(cartId:number , inventoryId:number , quantaty:number):Observable<ICart>{
   //return this.httpClient.post<ICart>(`${environment.APIURL}/Cart/${cartId}/${inventoryId}?quantity=${quantaty}`,{})
   return this.httpClient.post<ICart>(`${environment.APIURL}/Cart/${cartId}/${inventoryId}/${quantaty}`,{})
   //https://localhost:44375/api/Cart/14/50/5
  }
  

  RemoveItemFromCart(cartId:number,itemId:number  ):Observable<ICart>{
    return this.httpClient.post<ICart>(`${environment.APIURL}/Cart/removeItem/${cartId}/${itemId}`,{})
  }


  Order(orderInfo:IOrderLocation , cartId:number):Observable<ISuccessOrder>{
        return this.httpClient.post<ISuccessOrder>(`${environment.APIURL}/Order/${+cartId}/1`,orderInfo,this.httpOption)
  }

}

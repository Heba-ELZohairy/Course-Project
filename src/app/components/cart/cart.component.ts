import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { userdetails } from 'src/app/models/product';
import { ApiService }  from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 
  //CARTProducts: Product[] = [];
  products:Product[]=[];
  subscription1: Subscription = new Subscription;
  totalPrice : any =0;;
  private totalQuantitySubscription: Subscription=new Subscription();
  userdetails :userdetails=new userdetails('','',0);
  @Output() newItemEvent = new EventEmitter<number>();

  constructor(private ApiService: ApiService ) {
   

    this.ApiService.getAllCartProducts();
    this.subscription1=this.ApiService.CARTProducts$.subscribe(products => {
       this.products = products;

       this.totalQuantitySubscription = this.ApiService.totalPrice.subscribe(price => {
        this.totalPrice = price;
      });
  });
    
   
  }
  removeproduct(product: Product) {
    window.alert('This product will be deleted!');
    this.ApiService.removeProduct(product.id);
  }
  onSubmit(userdetails:userdetails)
  {
    this.userdetails.fullname=userdetails.fullname;
  this.userdetails.address=userdetails.address;
  this.userdetails.cardNum=userdetails.cardNum;
  localStorage.setItem('userdetails',this.userdetails.fullname);
  localStorage.setItem('userdaddress',this.userdetails.address);
  localStorage.setItem('totalPrice',this.totalPrice);
  }

  deleteItem(value: any) {
    this.newItemEvent.emit(value);
  }
 
  ngOnInit(): void {
  
this.ApiService.computeCartTotals();

  }
 
}

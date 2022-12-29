import { Component ,Input, OnDestroy, OnInit} from '@angular/core';
import { Product } from 'src/app/models/product';
import { ApiService }  from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import {  ActivatedRoute, Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements  OnInit, OnDestroy{
  @Input() productItem:any;
  @Output() removeItem = new EventEmitter<Product>();

  routerSubscription: Subscription = new Subscription;
  todoSubscription: Subscription = new Subscription;
   

  constructor(private ApiService: ApiService,private route: ActivatedRoute, private router: Router) {
   

    this.routerSubscription = this.route.params.subscribe(params => {
      const id = Number(params['productId']);

      this.todoSubscription = this.ApiService.getProduct(id).subscribe(Product => {
      
        if (!Product) {
          //this.router.navigate(['/404']);
          return;
        }

        this.productItem = Product;
      });
    });
    

   }


  remove() {
    // this.todosService.removeTodo(this.todo.id);
    this.removeItem.emit(this.productItem);
  }
   isCartRoute(){
    return this.router.url.includes("/cart");
   }
   ngOnInit(): void {
   
    };
    

  

  

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.todoSubscription.unsubscribe();
  }
  // removeTodo() {
  //   if (!this.productItem) return;

  //   this.ApiService.removeProduct(this.productItem.id);
  //   this.router.navigate(['/']);
  // }

  onQtyChange(bfore:any,after :any)
  {
  
    if(after >bfore)
    {
      //increse qty
      window.alert("Quantity incresed from :"+ bfore +" to :"+ after);
    }else
    {
      //decrease qty
      window.alert("Quantity decresed from :"+bfore+" to :"+ after);
    }

    this.productItem.qty=after;
    
 debugger;
    this.ApiService.UpdateQTY(this.productItem);
  }
  share(): void {
    window.alert('The product has been shared!');
  }

 

   addToCart(Product:Product) {
    window.alert('Your product has been added to the cart!');
   this.ApiService.addToCart(Product);
 this.ApiService.CARTProducts$.subscribe(products => {
      console.log(products) ;
  });
    
  }
}

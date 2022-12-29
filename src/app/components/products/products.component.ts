import { Component, Input, OnInit } from '@angular/core';
import { ApiService }  from 'src/app/services/api.service';
import { Product } from 'src/app/models/product'; 
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  AllProducts: Product[] = [];
  subscription: Subscription = new Subscription;

  constructor(private ApiService: ApiService) {
    this.ApiService.getAllProducts();
    this.subscription = this.ApiService.AllProducts$.subscribe(AllProducts => {
      this.AllProducts = AllProducts;
    });
  }

  ngOnInit(): void {
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}



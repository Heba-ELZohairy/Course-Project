import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { BehaviorSubject, Observable, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private AllProducts: Product[] = [];
  AllProducts$ = new BehaviorSubject<Product[]>(this.AllProducts);
  
  public CARTProducts: Product[] = [];
  CARTProducts$ = new BehaviorSubject<Product[]>(this.CARTProducts);

  totalPrice = new Subject<number>();

  constructor(private http: HttpClient) { }


  getAllProducts() {
    const s = this.http.get<Product[]>('/assets/products.json').subscribe(AllProducts => {
      this.AllProducts = AllProducts;
      this.AllProducts$.next(this.AllProducts);

      s.unsubscribe();
    });
  }
  getAllCartProducts() {
    debugger;

    //  this.CARTProducts$.asObservable();
    //this.CARTProducts$.next(this.CARTProducts);
    return this.CARTProducts$.asObservable();
  }

  getProduct(id: number) {
    return this.AllProducts$.asObservable()
      .pipe(map(AllProducts => AllProducts.find(Product => Product.id === id)));
  }

  UpdateQTY(ProductChanged:Product)
  {
 debugger;
    const index = this.AllProducts.findIndex(Product => Product.id === ProductChanged.id);
    this.AllProducts[index].qty = ProductChanged.qty
 
    this.AllProducts$.next(this.AllProducts);
    console.log(this.AllProducts$);
    this.computeCartTotals();
  }
  addToCart(product: Product) {
    var productExist = this.CARTProducts.find(x => x.id == product.id);
    if (productExist) {
      Number(productExist.qty) == Number(productExist.qty) + 1;
    }
    else {
      Number(product.qty) == Number(product.qty) + 1;
     
      this.CARTProducts.push(product);

    }
    this.CARTProducts$.next(this.CARTProducts);
    console.log(this.CARTProducts);
    this.computeCartTotals();
    debugger;
    // this.CARTProducts$.next(this.CARTProducts);

  }

  removeProduct(id: Number) {

    const index = this.CARTProducts.findIndex(Product => Product.id === id);
    this.CARTProducts.splice(index, 1);

    this.CARTProducts$.next(this.CARTProducts);
    this.computeCartTotals();
  }
  clearCart() {
    // this.CARTProducts = [];
    // return this.CARTProducts;
  }

  computeCartTotals(): void {
    let totalPrice = 0;
    let totalQuantity = 0;

    this.CARTProducts.forEach(cartItem => {
      totalPrice += Number(cartItem.qty) * Number(cartItem.price);

    });
    console.log(totalPrice);

    // Publish the new totals
    this.totalPrice.next(totalPrice);
    console.log(this.totalPrice);
  }

  getCartItems(): Product[] {
    return this.CARTProducts;
  }

  decrementQuantity(Product: Product) {
    Number(Product.qty) == Number(Product.qty) - 1;

    if (Product.qty === 0) {

      this.removeProduct(Product.id);
    } else {
      this.computeCartTotals();
    }
  }

}

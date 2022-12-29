import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit{
    name:string='';
    address:string='';
    totalPrice:any='';
    // localStorage.getItem('checkoutData');
    ngOnInit(){
      let name=localStorage.getItem('userdetails')
      this.name = name ? name : 'No Name '; 
  
      let address=localStorage.getItem('userdaddress')
      this.address = address ? address : 'No address '; 

      let totalPrice=localStorage.getItem('totalPrice')
      this.totalPrice = totalPrice ? totalPrice :  '' ; 
      }
  }



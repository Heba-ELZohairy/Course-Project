export class Product {
     id: Number;  
    name: String;  
    description: String;  
    image: String;  
    price: Number; 
    qty: Number;
    
    constructor(id: number, name: string, description:String,image: String, 
        price: number, qty: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.qty = qty;
      }
    
      
 
}

export class  userdetails {
   
  fullname: string;  
  address: string; 
  cardNum: Number;  
  constructor(fullname: string, address: string, cardNum:Number){
this.fullname=fullname;
this.address=address;
this.cardNum=cardNum;


  }
}
  

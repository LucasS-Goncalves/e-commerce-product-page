import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  product: Product = {
    images: [
      '../../../assets/images/image-product-1.jpg',
      '../../../assets/images/image-product-2.jpg',
      '../../../assets/images/image-product-3.jpg',
      '../../../assets/images/image-product-4.jpg',
    ],
    companyName: 'SNEAKER COMPANY',
    productName: 'Fall Limited Edition Sneakers',
    description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
    newPrice: 125.00,
    discount: 50,
    oldPrice: 250.00,
    productId: 0,
  }
}

import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService{
  emitedProduct = new Subject<{img1: string, productName: string, newPrice: number, amount: number, productId: number}>();
}

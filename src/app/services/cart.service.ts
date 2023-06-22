import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CartService{
  emitedProduct = new EventEmitter<{img1: string, productName: string, newPrice: number, amount: number}>();
}

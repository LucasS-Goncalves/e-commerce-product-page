import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

  openedMenu = false;
  cartOpened = false;

  cartItems: Cart[] = [];

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.cartService.emitedProduct.subscribe(
      item => {
        let index = this.cartItems.findIndex(product => product.productId === item.productId);
        if(index === -1) {
          this.cartItems.push(item);
        } else {
          this.cartItems[index].amount = item.amount;
        }
      }
    );
  }

  openMenu(){
    this.openedMenu = !this.openedMenu;
  }

  deleteItem(ItemIndex: number){
    this.cartItems.splice(ItemIndex, 1);
  }
}

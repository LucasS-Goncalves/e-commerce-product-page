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
  itemExistsInCartItems = false;

  cartItems: Cart[] = [];

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.cartService.emitedProduct.subscribe(
      item => {
        this.cartItems.forEach(product => {
          if(product.productName === item.productName && product.img1 === item.img1){
            product.amount = item.amount;
            this.itemExistsInCartItems = true;
          }
        });

        if(!this.itemExistsInCartItems){
          this.cartItems.push(item);
        };
      }
    )
  }

  openMenu(){
    this.openedMenu = !this.openedMenu;
  }

  deleteItem(ItemIndex: number){
    this.cartItems.splice(ItemIndex, 1)
  }

}

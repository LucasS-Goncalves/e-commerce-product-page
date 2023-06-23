import { Component, OnInit, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model'
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  indexOfActiveSlide = 0;
  product: Product = {
    img1: '',
    img2: '',
    img3: '',
    img4: '',
    companyName: '',
    productName: '',
    description: '',
    newPrice: 0,
    discount: 0,
    oldPrice: 0,
    productId:0,
  }



  amount = 1;

  constructor(private productService: ProductService, private cartService: CartService){}

  ngOnInit(): void {
    this.product = this.productService.product;
  }

  previousImg(){
    const slidesList = document.querySelector('.slides') as HTMLUListElement;
    const slides = Array.from(slidesList!.children);
    const activeSlide = slidesList?.querySelector('.active');
    this.indexOfActiveSlide = slides.indexOf(activeSlide!);

    this.indexOfActiveSlide--;

    if(this.indexOfActiveSlide < 0) {
      this.indexOfActiveSlide = (slides.length - 1);
    }

    activeSlide?.classList.remove('active');
    slides[this.indexOfActiveSlide].classList.add('active');
  }

  nextImg(){
    const slidesList = document.querySelector('.slides') as HTMLUListElement;
    const slides = Array.from(slidesList!.children);
    const activeSlide = slidesList?.querySelector('.active');
    this.indexOfActiveSlide = slides.indexOf(activeSlide!);

    this.indexOfActiveSlide++;

    if(this.indexOfActiveSlide >= slides.length) {
      this.indexOfActiveSlide = 0;
    }

    activeSlide?.classList.remove('active');
    slides[this.indexOfActiveSlide].classList.add('active');
  }

  onAddItem(img1: string, productName: string, newPrice: number, amount: number, productId: number){
    this.cartService.emitedProduct.next({img1, productName, newPrice, amount, productId});
  }

}

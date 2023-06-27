import { Component, OnInit, HostListener } from '@angular/core';
import { Product } from '../../models/product.model'
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  openedModal = false;
  innerWidth: any;
  indexOfActiveSlide = 0;
  product: Product = {
    images: ['img1' ,'img2' ,'img3' ,'img4' ],
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

    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.innerWidth = window.innerWidth;
  }

  previousImg(){

    if(this.openedModal){
      const modal = document.getElementById('modal');
      const slidesList = modal?.querySelector('.slides') as HTMLUListElement;
      const slides = Array.from(slidesList!.children);
      const activeSlide = slidesList?.querySelector('.active');
      this.indexOfActiveSlide = slides.indexOf(activeSlide!);
      this.indexOfActiveSlide--;

      if(this.indexOfActiveSlide < 0) {
        this.indexOfActiveSlide = (slides.length - 1);
      }

      const mainImg = modal?.querySelector('.mainImage')?.firstChild as HTMLImageElement;
      mainImg.src = this.product.images[this.indexOfActiveSlide];
      activeSlide?.classList.remove('active');
      slides[this.indexOfActiveSlide].classList.add('active');

    } else {
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
  }

  nextImg(){
    if(this.openedModal){
      const modal = document.getElementById('modal');
      const slidesList = modal?.querySelector('.slides') as HTMLUListElement;
      const slides = Array.from(slidesList!.children);
      const activeSlide = slidesList?.querySelector('.active');
      this.indexOfActiveSlide = slides.indexOf(activeSlide!);
      this.indexOfActiveSlide++;

      if(this.indexOfActiveSlide >= slides.length) {
        this.indexOfActiveSlide = 0;
      }

      const mainImg = modal?.querySelector('.mainImage')?.firstChild as HTMLImageElement;
      mainImg.src = this.product.images[this.indexOfActiveSlide];
      activeSlide?.classList.remove('active');
      slides[this.indexOfActiveSlide].classList.add('active');
    } else {
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
  }

  onAddItem(img1: string, productName: string, newPrice: number, amount: number, productId: number){
    this.cartService.emitedProduct.next({img1, productName, newPrice, amount, productId});
  }

  changeMainImg(index: number){

    if(this.openedModal){
      const modal = document.getElementById('modal');
      const mainImg = modal?.querySelector('.mainImage')?.firstChild as HTMLImageElement;
      console.log(index)
      mainImg.src = this.product.images[index];

      const slidesList = modal?.querySelector('.slides') as HTMLUListElement;
      const slides = Array.from(slidesList!.children);
      const activeSlide = slidesList?.querySelector('.active');
      let indexOfActiveSlide = slides.indexOf(activeSlide!);
      slides[indexOfActiveSlide].classList.remove('active');
      slides[index].classList.add('active');

    } else {
      const mainImg = document.querySelector('.mainImage')?.firstChild as HTMLImageElement;
      mainImg.src = this.product.images[index];

      const slidesList = document.querySelector('.slides') as HTMLUListElement;
      const slides = Array.from(slidesList!.children);
      const activeSlide = slidesList?.querySelector('.active');
      let indexOfActiveSlide = slides.indexOf(activeSlide!);
      slides[indexOfActiveSlide].classList.remove('active');
      slides[index].classList.add('active');
    }

  }

  imgZoom(event?: Event){
    this.openedModal = true;
    const modal = document.getElementById('modal') as HTMLDialogElement
    modal.showModal();
    const selectedImg = event?.target as HTMLImageElement;
    const mainImg = modal?.querySelector('.mainImage')?.firstChild as HTMLImageElement;
    mainImg.src = selectedImg.src;
    const slidesList = modal?.querySelector('.slides') as HTMLUListElement;

    const activeSlide = slidesList?.querySelector('.active');
    const slides = Array.from(slidesList!.children);
    const slidesImages: any[] = [];
    let matchedImageIndex = 0;

    slides.forEach(li => {
      slidesImages.push(li.firstChild);
    })



    slidesImages.forEach((img: HTMLImageElement, index: number) => {
      if(img.src === selectedImg.src){
        matchedImageIndex = index;
        return;
      }
    })
    activeSlide?.classList.remove('active');
    slides[matchedImageIndex].classList.add('active');
  }

  closeZoom(){
    this.openedModal = false;
    const modal = document.getElementById('modal') as HTMLDialogElement
    modal.close()
  }

}

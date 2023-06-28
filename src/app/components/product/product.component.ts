import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('slidesUl') slidesUl!:ElementRef<HTMLUListElement>
  @ViewChild('mainImage') mainImage!:ElementRef<HTMLImageElement>;

  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  @ViewChild('slidesUlInModal') slidesUlInModal!:ElementRef<HTMLUListElement>;
  @ViewChild('modalMainImage') modalMainImage!:ElementRef<HTMLImageElement>;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    ) {}

  ngOnInit(): void {
    this.product = this.productService.product;
    this.innerWidth = window.innerWidth;
    if(this.innerWidth < 1230){}
  }

  onAddItem(img1: string, productName: string, newPrice: number, amount: number, productId: number){
    this.cartService.emitedProduct.next({img1, productName, newPrice, amount, productId});
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.innerWidth = window.innerWidth;
    if(this.innerWidth < 1230 && this.openedModal === true){
      this.closeZoom();
    }

  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.key === 'Escape'){
      this.closeZoom();
    }
  }

  previousImg(){

    if(this.openedModal){
      const slidesInSlidesUlInModal = Array.from(this.slidesUlInModal.nativeElement.children);
      const activeSlide = this.slidesUlInModal.nativeElement.querySelector('.active');

      this.indexOfActiveSlide = slidesInSlidesUlInModal.indexOf(activeSlide!);
      this.indexOfActiveSlide--;

      if(this.indexOfActiveSlide < 0) this.indexOfActiveSlide = (slidesInSlidesUlInModal.length - 1);

      this.modalMainImage.nativeElement.src = this.product.images[this.indexOfActiveSlide];
      activeSlide?.classList.remove('active');
      slidesInSlidesUlInModal[this.indexOfActiveSlide].classList.add('active');

    } else {
      const slidesInSlidesUl = Array.from(this.slidesUl.nativeElement.children);
      const activeSlide = this.slidesUl.nativeElement.querySelector('.active');

      this.indexOfActiveSlide = slidesInSlidesUl.indexOf(activeSlide!);
      this.indexOfActiveSlide--;

      if(this.indexOfActiveSlide < 0) this.indexOfActiveSlide = (slidesInSlidesUl.length - 1);

      activeSlide?.classList.remove('active');
      slidesInSlidesUl[this.indexOfActiveSlide].classList.add('active');
    }
  }

  nextImg(){

    if(this.openedModal){
      const slidesInSlidesUlInModal = Array.from(this.slidesUlInModal.nativeElement.children);
      const activeSlide = this.slidesUlInModal.nativeElement.querySelector('.active');

      this.indexOfActiveSlide = slidesInSlidesUlInModal.indexOf(activeSlide!);
      this.indexOfActiveSlide++;

      if(this.indexOfActiveSlide >= slidesInSlidesUlInModal.length) this.indexOfActiveSlide = 0;

      this.modalMainImage.nativeElement.src = this.product.images[this.indexOfActiveSlide];
      activeSlide?.classList.remove('active');
      slidesInSlidesUlInModal[this.indexOfActiveSlide].classList.add('active');

    } else {
      const slidesInSlidesUl = Array.from(this.slidesUl.nativeElement.children);
      const activeSlide = this.slidesUl.nativeElement.querySelector('.active');

      this.indexOfActiveSlide = slidesInSlidesUl.indexOf(activeSlide!);
      this.indexOfActiveSlide++;

      if(this.indexOfActiveSlide >= slidesInSlidesUl.length) this.indexOfActiveSlide = 0;

      activeSlide?.classList.remove('active');
      slidesInSlidesUl[this.indexOfActiveSlide].classList.add('active');
    }
  }

  changeMainImg(index: number){

    if(this.openedModal){
      this.modalMainImage.nativeElement.src = this.product.images[index];

      const slidesInSlidesUlInModal = Array.from(this.slidesUlInModal.nativeElement!.children);
      const activeSlide = this.slidesUlInModal.nativeElement?.querySelector('.active');
      let indexOfActiveSlide = slidesInSlidesUlInModal.indexOf(activeSlide!);
      slidesInSlidesUlInModal[indexOfActiveSlide].classList.remove('active');
      slidesInSlidesUlInModal[index].classList.add('active');

    } else {
      this.mainImage.nativeElement.src = this.product.images[index];

      const slidesInSlidesUl = Array.from(this.slidesUl.nativeElement.children);
      const activeSlide = this.slidesUl.nativeElement.querySelector('.active');
      let indexOfActiveSlide = slidesInSlidesUl.indexOf(activeSlide!);
      slidesInSlidesUl[indexOfActiveSlide].classList.remove('active');
      slidesInSlidesUl[index].classList.add('active');
    }

  }

  imgZoom(event?: Event){
    console.log('s')
    this.openedModal = true;
    this.modal.nativeElement.showModal();
    const selectedImg = event?.target as HTMLImageElement;
    this.modalMainImage.nativeElement.src = selectedImg.src;

    const activeSlide = this.slidesUlInModal.nativeElement.querySelector('.active');
    const slidesInSlidesUl = Array.from(this.slidesUl.nativeElement.children);
    const slidesInSlidesUlInModal = Array.from(this.slidesUlInModal.nativeElement!.children);
    const slidesImages: any[] = [];
    let matchedImageIndex = 0;

    slidesInSlidesUl.forEach(li => {
      slidesImages.push(li.firstChild);
    })

    slidesImages.forEach((img: HTMLImageElement, index: number) => {
      if(img.src === selectedImg.src){
        matchedImageIndex = index;
        return;
      }
    })
    activeSlide?.classList.remove('active');
    slidesInSlidesUlInModal[matchedImageIndex].classList.add('active');
  }

  closeZoom(){
    this.openedModal = false;
    this.modal.nativeElement.close();
  }

}

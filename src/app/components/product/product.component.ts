import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  indexOfActiveSlide = 0;

  constructor(){}

  ngOnInit(): void {
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
}

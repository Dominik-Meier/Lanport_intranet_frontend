import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appMealOrderStatusBackgroundColor]'
})
export class MealOrderStatusBackgroundColorDirective implements OnInit{
  @Input() appMealOrderStatusBackgroundColor = '';

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    console.log(this.appMealOrderStatusBackgroundColor);
    if (this.appMealOrderStatusBackgroundColor.toUpperCase() === 'ORDERED') {
      this.el.nativeElement.style.background = '#3f51b5';
      this.el.nativeElement.style.border = '1px solid #3f51b5';
    } else if (this.appMealOrderStatusBackgroundColor.toUpperCase() === 'PROGRESS') {
      this.el.nativeElement.style.backgroundColor = '#b58e3f';
      this.el.nativeElement.style.border = '1px solid #b58e3f';
    } else if (this.appMealOrderStatusBackgroundColor.toUpperCase() === 'MADE') {
      this.el.nativeElement.style.backgroundColor = '#0aa900';
      this.el.nativeElement.style.border = '1px solid #0aa900';
    } else if (this.appMealOrderStatusBackgroundColor.toUpperCase() === 'DONE') {
      this.el.nativeElement.style.backgroundColor = '#0aa900';
      this.el.nativeElement.style.border = '1px solid #0aa900';
    }
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'quantity-control',
  templateUrl: './quantity-control.component.html',
  styleUrls: ['./quantity-control.component.css']
})
export class QuantityControlComponent {
  @Input() quantity!: number;
  @Input() min: number = 1;
  @Input() max: number = 100;
  @Output() onQuantityChange = new EventEmitter<number>();

  constructor() {}

  plusOne = () => {
    if (this.quantity < this.max) {
      this.changeQuantity(++this.quantity);
    }
  };

  minusOne = () => {
    if (this.quantity > this.min) {
      this.changeQuantity(--this.quantity);
    }
  }

  changeQuantity(quantity: number): void {
    if (this.onQuantityChange.observed) {
      this.onQuantityChange.emit(quantity);
    }
  }
}

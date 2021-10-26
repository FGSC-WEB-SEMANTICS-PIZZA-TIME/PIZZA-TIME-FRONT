import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Pizza} from "../../../shared/_models/pizza.model";

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.css']
})
export class PizzaCardComponent implements OnInit, OnChanges {
  @Input() pizza!: Pizza;
  frontCoverImage: string = '';
  backCoverImage: string = '';
  constructor() { }

  ngOnInit(): void {
    this.randomizeImages();
    setInterval(() => this.randomizeImages(), 8000);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.pizza = changes.pizza.currentValue;
  }
  randomizeImages(){
    if (this.pizza.imageHits.length !== 0 ){
      this.frontCoverImage = this.pizza.imageHits[this.randomIntFromInterval(this.pizza.imageHits.length)].webformatURL;
      this.backCoverImage = this.pizza.imageHits[this.randomIntFromInterval(this.pizza.imageHits.length)].webformatURL;
    } else {
      this.frontCoverImage = "assets/images/pizza.webp";
      this.backCoverImage = "assets/images/pizza2.webp";
    }
  }
  randomIntFromInterval(max: number) {
    return Math.floor(Math.random() * (max));
  }
}

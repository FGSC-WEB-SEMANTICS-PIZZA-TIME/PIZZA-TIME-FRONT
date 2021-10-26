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
    this.randomizeImages()
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.pizza = changes.pizza.currentValue;
  }
  randomizeImages(){
    setInterval(() => {
      this.frontCoverImage = this.pizza.imageHits[this.randomIntFromInterval(this.pizza.imageHits.length)].imageURL;
      this.backCoverImage = this.pizza.imageHits[this.randomIntFromInterval(this.pizza.imageHits.length)].imageURL;
    }, 8000);
  }
  randomIntFromInterval(max: number) {
    return Math.floor(Math.random() * (max))
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Pizza} from "../../../shared/_models/pizza.model";

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.css']
})
export class PizzaCardComponent implements OnInit {
  // @ts-ignore
  @Input() pizza: Pizza;
  random: number = 0;
  constructor() { }

  ngOnInit(): void {
    setInterval(() => this.random = this.randomIntFromInterval(this.pizza.imageHits.length), 8000)
  }

  randomIntFromInterval(max: number) { // min and max included
    return Math.floor(Math.random() * (max + 1))
  }
}

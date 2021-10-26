import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzasComponent } from './pizzas.component';

import { SliderModule } from 'primeng/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {IvyCarouselModule} from "angular-responsive-carousel";
import { PizzaCardComponent } from './pizza-card/pizza-card.component';

@NgModule({
  declarations: [PizzasComponent, PizzaCardComponent],
  imports: [CommonModule, SliderModule, ReactiveFormsModule, FormsModule, NgxSliderModule, IvyCarouselModule],
})
export class PizzasModule {}

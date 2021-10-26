import {Options} from "@angular-slider/ngx-slider";

export class PizzaSlider{
  constructor(public propertyName: string, public min: number, public max: number, public options: Options) {}
}

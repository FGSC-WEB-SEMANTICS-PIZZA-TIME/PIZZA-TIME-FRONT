import {PizzaSlider} from "./pizza-slider.model";
import {PizzaDropdown} from "./pizza-dropdown.model";

export class PaginationHelper{
  search: string = '';
  dropdownValues: PizzaDropdown[] = [];
  sliderValues: PizzaSlider[] = [];
  limit       = 10;
  offset      = 0;
}

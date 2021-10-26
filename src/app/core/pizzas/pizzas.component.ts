import {Component, OnInit} from '@angular/core';
import {PaginationHelper} from "../../shared/_models/pagination-helper.model";
import {OwlService} from "../../shared/_services/owl.service";
import {BehaviorSubject} from "rxjs";
import {finalize, map} from "rxjs/operators";
import {ChangeContext, Options} from "@angular-slider/ngx-slider";
import {PizzaSlider} from "../../shared/_models/pizza-slider.model";
import {PizzaDropdown} from "../../shared/_models/pizza-dropdown.model";
import {Pizza} from "../../shared/_models/pizza.model";
import {ImageFetcherService} from "../../shared/_services/image-fetcher.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css'],
})
export class PizzasComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  filter = new PaginationHelper();
  pizzas: Pizza[] = [];
  dropdowns: PizzaDropdown[] = [];
  sliders: PizzaSlider[] = [];
  search = new FormControl('');
  constructor(private service: OwlService, private imagesFetcher: ImageFetcherService) {}

  ngOnInit(): void {
    this.service.classProperties('Pizza').pipe(
      map(value => {
        for (const val of value) {
          this.service.propertyValues(val.propertyName, val.propertyType)
            .pipe(
              map(propertyValues => {
                if (val.propertyType === 'DatatypeProperty') {
                  let min = 0;
                  let max = 500;
                  this.sliders.push(new PizzaSlider(val.propertyName, min, max))
                } else {
                  this.dropdowns.push(new PizzaDropdown(val.propertyName, ['TEST', 'TESTt','TES']));
                }
              })
            )
            .subscribe();
        }
      }),
      finalize(() => this.loading$.next(false))
    ).subscribe();
    this.doFilter();
  }


  doFilter() {
    this.loading$.next(true);
    this.service.query(this.filter)
      .pipe(
        map(pizzaNames => {
          for (let pizzaName of pizzaNames){
            pizzaName = pizzaName.toLowerCase().replace('_',' ');
            this.imagesFetcher.fetchImage(pizzaName).subscribe(response => {
              this.pizzas.push(new Pizza(pizzaName, response.hits));
            }, () => {
              // TODO : REPLACE WITH A GENERIC PIZZA IMAGE
            });
          }
        }),
        finalize(() => this.loading$.next(false))
      ).subscribe();
  }

  sliderFilter($event: ChangeContext) {

  }

  dropdownFilter($event: Event, propertyName: string) {

  }

  options: Options = {
    floor: 0,
    ceil: 100,
  };

}

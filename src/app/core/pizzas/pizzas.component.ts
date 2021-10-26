import {Component, OnInit} from '@angular/core';
import {PaginationHelper} from "../../shared/_models/pagination-helper.model";
import {OwlService} from "../../shared/_services/owl.service";
import {BehaviorSubject} from "rxjs";
import {finalize, map} from "rxjs/operators";
import {PizzaSlider} from "../../shared/_models/pizza-slider.model";
import {PizzaDropdown} from "../../shared/_models/pizza-dropdown.model";
import {Pizza} from "../../shared/_models/pizza.model";
import {ImageFetcherService} from "../../shared/_services/image-fetcher.service";

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css'],
})
export class PizzasComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  filter = new PaginationHelper();
  pizzas: Pizza[] = [];
  isReset = false;
  constructor(private service: OwlService, private imagesFetcher: ImageFetcherService) {}
  ngOnInit(): void {
    this.fetchAndFilter();
  }
  doFilter() {
    console.log(this.filter)
    this.loading$.next(true);
    this.service.query(this.filter)
      .pipe(
        map(pizzaNames => {
          const newPizza: Pizza[] = [];
          for (let pizzaName of pizzaNames) {
            pizzaName = pizzaName.toLowerCase().replace('_', ' ');
            this.imagesFetcher.fetchImage(pizzaName).subscribe(response => {
              newPizza.push(new Pizza(pizzaName, response.hits));
            });
          }
          this.pizzas = newPizza;
        }),
        finalize(() => this.loading$.next(false))
      ).subscribe(() => console.warn('DONE'));
  }
  resetFilter(){
    this.filter = new PaginationHelper();
    this.doFilter();
  }

  fetchAndFilter() {
    this.service.propertySubClasses('Pizza').pipe(
      map(subclasses => {
        //this.dropdowns.push();
        this.filter.dropdownValues.push(new PizzaDropdown('Type', subclasses));
      }),
      finalize(() => {
        this.loading$.next(false);
      })
    ).subscribe();
    this.service.classProperties('Pizza').pipe(
      map(value => {
        for (const val of value) {
          this.service.propertyValues(val.propertyName, val.propertyType)
            .pipe(
              map(propertyValues => {
                if (val.propertyType === 'DatatypeProperty') {
                  let min = 0;
                  let max = 500;
                  this.filter.sliderValues.push(new PizzaSlider(val.propertyName, min, max, {floor: min, ceil: max}));
                } else {
                  this.filter.dropdownValues.push(new PizzaDropdown(val.propertyName, propertyValues));
                }
              }),
            )
            .subscribe();
        }
      }),
    ).subscribe();
    this.doFilter();
  }
}

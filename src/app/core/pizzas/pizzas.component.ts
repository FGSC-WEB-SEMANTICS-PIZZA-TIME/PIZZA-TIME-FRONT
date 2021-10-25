import {Component, OnInit} from '@angular/core';
import {PaginationHelper} from "../../shared/_models/pagination-helper.model";
import {OwlService} from "../../shared/_services/owl.service";
import {BehaviorSubject} from "rxjs";
import {finalize, map} from "rxjs/operators";
import {ChangeContext, Options} from "@angular-slider/ngx-slider";
import {PizzaSlider} from "../../shared/_models/pizza-slider.model";
import {PizzaDropdown} from "../../shared/_models/pizza-dropdown.model";

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css'],
})
export class PizzasComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  filter = new PaginationHelper();
  pizzas: string[] = [];
  dropdowns: PizzaDropdown[] = [];
  sliders: PizzaSlider[] = [];
  constructor(private service: OwlService) {}

  ngOnInit(): void {
    this.service.classProperties('Pizza').pipe(
      map(value => {
        for (const val of value) {
          // TODO : GET VALUES
          this.service.propertyValues(val.propertyName, val.propertyType)
            .pipe(
              map(values => {
                if (val.propertyType === 'DatatypeProperty') {
                  // TODO : FIND MIN AND MAX THEN INSTNACIATE
                  let min = 0;
                  let max = 500;
                  this.sliders.push(new PizzaSlider(val.propertyName, min, max))
                } else {
                  this.dropdowns.push(new PizzaDropdown(val.propertyName, values.get(val.propertyName)));
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
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe(paginatedPizzas => this.pizzas = paginatedPizzas);
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

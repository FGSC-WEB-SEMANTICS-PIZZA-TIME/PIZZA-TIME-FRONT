export class PizzaDropdown{
  selected: string = this.data[0] ?? '';
  constructor(public propertyName: string, public data: string[]) {}
}

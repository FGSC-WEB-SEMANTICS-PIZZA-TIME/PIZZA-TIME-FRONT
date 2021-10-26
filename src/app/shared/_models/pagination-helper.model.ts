export class PaginationHelper{
  search: string = '';
  type: string = '';
  dropdownValues: Map<string,string> = new Map<string, string>();
  sliderValues: Map<string,[min: number, max: number]> = new Map<string, [min: number, max: number]>();
  limit       = 10;
  offset      = 0;
}

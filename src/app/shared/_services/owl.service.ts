import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PaginationHelper} from "../_models/pagination-helper.model";
import {environment} from "../../../environments/environment";
import {PropertyData} from "../_models/property-data.model";


@Injectable({
  providedIn: 'root'
})
export class OwlService {
  constructor(private http: HttpClient) { }
  // TODO : STRIP URI PREFIX

  classProperties(className: string){
    return this.http.get<PropertyData[]>(`${environment.gateway}generic/properties?className=${className}`);
  }
  // http://localhost:8080/generic?key=hasCrust&type=ObjectProperty
  propertyValues(propertyName: string, propertyType: string){
    return this.http.get<string[]>(`${environment.gateway}generic?key=${propertyName}&type=${propertyType}`)
  }
  propertySubClasses(propertyName: string){
    return this.http.get<string[]>(`${environment.gateway}subclasses?type=${propertyName}`);
  }
  query(filter: PaginationHelper){
    return this.http.post<string[]>(`${environment.gateway}pizzas/query`,filter);
  }
}

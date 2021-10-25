import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FetchedImages} from "../_models/fetched-images.model";

@Injectable({
  providedIn: 'root'
})
export class ImageFetcherService {
  static API_ENDPOINT = 'https://pixabay.com/api/';
  static KEY = '24031401-de3ca767f7bd220e75f42567c';
  constructor(private http: HttpClient) { }
  fetchImage(searchWord: string){
    return this.http.get<FetchedImages>(`${ImageFetcherService.API_ENDPOINT}?key=${ImageFetcherService.KEY}&q=${searchWord}&image_type=photo`);
  }

}

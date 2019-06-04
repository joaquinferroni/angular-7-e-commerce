import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlDataService {
  private _Id: number;

  set Id(value: number) {
    this._Id = value;
  }

  get Id(): number {
    return this._Id;
  }

  constructor() { }
}

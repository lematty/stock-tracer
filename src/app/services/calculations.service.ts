import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  constructor() { }

  getAverage(array: any[], property: string): number {
    return array.reduce((a, b) => a + b[property], 0) / array.length;
  }

  getSum(array: any[], property: string): number {
    return array.reduce((a, b) => a + Number(b[property]), 0);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Papa, ParseResult } from 'ngx-papaparse';

const FILE_PATH = '../../assets/bourse.csv';

@Injectable({
  providedIn: 'root'
})
export class FileParseService {

  constructor(private http: HttpClient, private papa: Papa) {}

  loadFile(file: string = FILE_PATH) {
    this.http.get(file, { responseType: 'text' }).subscribe(
      data => this.extractData(data),
      error => console.log(error));
  }

  extractData(data: string) {
    this.papa.parse(data, {
      header: true,
      complete: (parseData: ParseResult) => {
        this.headers = parseData.meta.fields;
        this.rows = parseData.data;
        console.log(this.headers);
        console.log(this.rows);
      }
    });
  }
}

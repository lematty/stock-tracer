import { Injectable } from '@angular/core';
import { Papa, ParseResult } from 'ngx-papaparse';

const FILE_PATH = '../../assets/bourse.csv';

@Injectable({
  providedIn: 'root'
})
export class FileParseService {

  public headers = [];
  public rows = [];

  constructor(private papa: Papa) {}

  extractData(data: File): Promise<{ headers: string[], rows: string[][] }> {
    return new Promise((resolve, error) => {
      this.papa.parse(data, {
        header: true,
        complete: (parseData: ParseResult) => {
          this.headers = parseData.meta.fields;
          this.rows = parseData.data;
          resolve({ headers: this.headers, rows: this.rows });
        },
        error: (err: any) => error(err),
      });
    });
  }
}

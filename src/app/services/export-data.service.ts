import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { BASE_HEADER_LIST } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ExportDataService {

  constructor(private papa: Papa) { }

  downloadCSV(ids: string[], data: any) {
    console.log('download data', ids, data);
    const headers = BASE_HEADER_LIST;
    const rows = ids.map(id => data[id]);
    console.log('CSV ROWS: ', rows);
    const csv = this.papa.unparse({
      fields: headers,
      data: rows,
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
      alert( 'Please disable your Pop-up blocker and try again.');
    }
    console.log('csv: ', csv);
  }
}

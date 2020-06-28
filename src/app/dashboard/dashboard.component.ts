import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { DataImportModalComponent } from '../data-import-modal/data-import-modal.component';
import { MatchData, BaseRow } from '../models';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { addStock, deleteStock, clearStocks } from '../store/actions/stock.actions';
import { selectStocks } from '../store/selectors/stock.selector';
import { StockState } from '../store/reducers/stock.reducer';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  rows$ = this.store.pipe(select(selectStocks));
  addRowsModalEnabled = false;

  constructor(public dialog: MatDialog, private store: Store<StockState>) {}

  ngOnInit(): void {
  }

  openImportDialog() {
    const dialogRef = this.dialog.open(DataImportModalComponent);
    dialogRef.afterClosed().subscribe((matchData: MatchData) => {
      if (matchData) {
        this.formatMatches(matchData);
      }
      this.close('matched import data');
    });
  }

  toggleAddRows() {
    this.addRowsModalEnabled = !this.addRowsModalEnabled;
  }

  addNewStock(stock: BaseRow) {
    this.store.dispatch(addStock({ stock }));
  }

  removeRow(symbol: string) {
    this.store.dispatch(deleteStock({ symbol }));
  }

  removeAllRows() {
    this.store.dispatch(clearStocks());
  }

  close(reason: string) {
    console.log(reason);
    this.sidenav.close();
  }

  formatMatches(matchData: MatchData) {
    let count = 0;
    const newRows = [];
    matchData.rows.forEach(row => {
      const newRow = {
        symbol: '',
        shares: '',
        buyPrice: '',
        dividendYeild: ''
      };
      for (const header of Object.keys(matchData.rank)) {
        const index = matchData.rank[header];
        const matchedHeader = matchData.headers[index];
        newRow[header] = row[matchedHeader];
      }
      newRows.push(newRow);
      count++;
    });
    // this.formattedImportData = newRows;
  }
}

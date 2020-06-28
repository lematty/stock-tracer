import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { DataImportModalComponent } from '../data-import-modal/data-import-modal.component';
import { MatchData, BaseRow, FileTypes, FileDirection } from '../models';
import { select, Store } from '@ngrx/store';
import { addStock, deleteStock, clearStocks } from '../store/actions/stock.actions';
import { selectStocks, selectHeaders, selectStoreState } from '../store/selectors/stock.selector';
import { StockState } from '../store/reducers/stock.reducer';
import { ChooseFileTypeComponent } from '../choose-file-type/choose-file-type.component';
import { ExportDataService } from '../services';
import { Observable } from 'rxjs';
import { Stock } from '../store/stock.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  FileDirection = FileDirection;
  stocks$ = this.store.pipe(select(selectStocks));
  headers$ = this.store.pipe(select(selectHeaders));
  addRowsModalEnabled = false;

  constructor(public dialog: MatDialog, private store: Store<StockState>, private exportDataService: ExportDataService) {}

  ngOnInit(): void {
  }

  openFileTypeDialog(direction: FileDirection) {
    const fileTypeRef = this.dialog.open(ChooseFileTypeComponent);
    fileTypeRef.afterClosed().subscribe((fileType: FileTypes) => {
      if (fileType === FileTypes.CSV) {
        console.log('INSIDE FileTypes.CSV');
        if (direction === FileDirection.Export) {
          console.log('INSIDE FileDirection.Export');
          this.downloadCSVFile();
        } else {
          console.log('INSIDE FileDirection.Import');
          this.openImportDialog();
        }
      } else if (fileType === FileTypes.JSON) {
        console.log('INSIDE FileTypes.JSON');
      } else {
        console.log('CLOSED BY USER');
      }
    });
  }

  openImportDialog() {
    console.log('opening import data');
    const dialogRef = this.dialog.open(DataImportModalComponent);
    dialogRef.afterClosed().subscribe((matchData: MatchData) => {
      if (matchData) {
        this.formatMatches(matchData);
      }
      this.close('matched import data');
    });
  }

  downloadCSVFile() {
    let currentState: StockState;
    this.store.pipe(select(selectStoreState), take(1)).subscribe((state) => currentState = state);
    console.log(currentState);
    this.exportDataService.downloadCSV(currentState.ids as string[], currentState.entities);
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

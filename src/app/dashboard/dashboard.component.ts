import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { DataImportModalComponent } from '../data-import-modal/data-import-modal.component';
import { MatchData } from '../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  formattedImportData: any[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DataImportModalComponent);
    dialogRef.afterClosed().subscribe((matchData: MatchData) => {
      if (matchData) {
        this.formatMatches(matchData);
      }
      this.close('matched import data');
    });
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
    this.formattedImportData = newRows;
  }
}

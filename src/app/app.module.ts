import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataImportModalComponent } from './data-import-modal/data-import-modal.component';
import { StockTableComponent } from './stock-table/stock-table.component';

// Material Design Components
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

// Services
import { FileParseService } from './services/file-parse.service';
import { MatchColumnsModalComponent } from './match-columns-modal/match-columns-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    StockTableComponent,
    DashboardComponent,
    DataImportModalComponent,
    MatchColumnsModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatRadioModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [FileParseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

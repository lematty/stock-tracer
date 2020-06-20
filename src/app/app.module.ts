import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockTableComponent } from './stock-table/stock-table.component';

// Material Design Components
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DataImportModalComponent } from './data-import-modal/data-import-modal.component';

// Services
import { FileParseService } from './services/file-parse.service';


@NgModule({
  declarations: [
    AppComponent,
    StockTableComponent,
    DashboardComponent,
    DataImportModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [FileParseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

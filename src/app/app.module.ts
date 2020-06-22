import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataImportModalComponent } from './data-import-modal/data-import-modal.component';
import { StockTableComponent } from './stock-table/stock-table.component';

// Material Design Components
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatchColumnsModalComponent } from './match-columns-modal/match-columns-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
// import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
// import { MatInputModule } from '@angular/material/input';

// Services
import { CalculationsService, FileParseService, FormatTableDataService, StockDataService } from './services';


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
    // MatFormFieldModule,
    MatIconModule,
    // MatInputModule,
    MatRadioModule,
    // ReactiveFormsModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    // MatStepperModule,
  ],
  providers: [
    CalculationsService,
    FileParseService,
    FormatTableDataService,
    StockDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataImportModalComponent } from './data-import-modal/data-import-modal.component';
import { StockTableComponent } from './stock-table/stock-table.component';

// Material Design Components
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatchColumnsModalComponent } from './match-columns-modal/match-columns-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
// import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';

// Services
import { CalculationsService, FileParseService, FormatTableDataService, StockDataService } from './services';

// Ngrx Store
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { stockReducer } from './store/reducers/stock.reducer';
// import { selectedStocksReducer } from './store/reducers/selected-stocks.reducer';
// import { stocksReducer } from './store/reducers/stock.reducer';
import { AddStockFormComponent } from './add-stock-form/add-stock-form.component';
// import { StockEffects } from './store/effects/stock.effects';
import { environment } from '../environments/environment';
import { StockEffects } from './store/effects/stock.effects';


@NgModule({
  declarations: [
    AppComponent,
    StockTableComponent,
    DashboardComponent,
    DataImportModalComponent,
    MatchColumnsModalComponent,
    AddStockFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([StockEffects]),
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    StoreModule.forRoot({ stocks: stockReducer }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
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

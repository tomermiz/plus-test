import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockTableComponent } from './components/stock-table/stock-table.component';
import {MainComponent} from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { StockHistoryDetailsComponent } from './components/stock-history-details/stock-history-details.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    StockTableComponent,
    StockHistoryDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

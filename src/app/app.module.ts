import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 import { StockTableComponent } from './components/stock-table/stock-table.component';
import {MainComponent} from './components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    StockTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

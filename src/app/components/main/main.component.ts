import { Component, OnInit } from '@angular/core';
import {StockService} from '../../service/stock.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  selectedStockId: number;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.initData();
  }

  handleStockSelected(stockId): void{
    this.selectedStockId = stockId;
  }
}

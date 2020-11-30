import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {StockDataModel} from '../../models/stock-data.model';
import {StockService} from '../../service/stock.service';

@Component({
  selector: 'app-stock-history-details',
  templateUrl: './stock-history-details.component.html',
  styleUrls: ['./stock-history-details.component.css']
})
export class StockHistoryDetailsComponent implements OnInit, OnDestroy {

  @Input() set selectedStockId(stockId: number) {
    if (this.stockId !== stockId){
      this.stockId = stockId;
      this.getData();
    }
  }

  stockId: number;


  stock: StockDataModel;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
  }

  getData(): void {
    if (this.stockId){
      this.stock = this.stockService.getStock(this.stockId);
    }
  }




  ngOnDestroy(): void {
  }


}

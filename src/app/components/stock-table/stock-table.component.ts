import {Component, OnInit, Output} from '@angular/core';
import {StockService} from '../../service/stock.service';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit {


  @Output() stockSelected = new EventEmitter<number>();

  constructor(public stockService: StockService) { }

  ngOnInit(): void {
  }

  selectStock(stockId: number): void{
    this.stockSelected.emit(stockId);
  }

}

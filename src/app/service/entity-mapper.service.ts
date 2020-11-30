import { Injectable } from '@angular/core';
import {StockDataModel} from '../models/stock-data.model';
import {PricePairModel} from '../models/price-pair.model';
import {isNumber} from 'util';
import {FeedModel} from '../models/feed.model';


@Injectable({
  providedIn: 'root'
})
export class EntityMapperService {

  constructor() { }


  mapStock(data: any): StockDataModel {
    return {

      Id: data.Id,
      Name: data.Name,
      Symbol: data.Symbol,
      PrecisionDigit: data.PrecisionDigit,
      BuyPrice:    isNumber(data.BuyPrice) ?  data.BuyPrice : 0,
      SellPrice:  isNumber(data.SellPrice) ?  data.SellPrice : 0,
      PricePair: new Array<PricePairModel>()
    };
  }

  mapFeed(data: any): FeedModel {
    return {
      StockId: data.StockId,
      BuyPrice:    isNumber(data.BuyPrice) ?  data.BuyPrice : 0,
      SellPrice:  isNumber(data.SellPrice) ?  data.SellPrice : 0,
    };
  }
}

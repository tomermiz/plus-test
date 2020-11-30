import {PricePairModel} from './price-pair.model';

export interface StockDataModel {

  Id: number;
  Name: string;
  Symbol: string;
  PrecisionDigit: number;
  BuyPrice: number;
  SellPrice: number;
  PricePair: Array<PricePairModel>;
}

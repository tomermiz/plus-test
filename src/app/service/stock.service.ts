import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {StockDataModel} from '../models/stock-data.model';
import {HttpService} from './http.service';
import { interval, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import {FeedsModel} from '../models/feeds.model';
import {map, startWith} from 'rxjs/operators';
import {FeedModel} from '../models/feed.model';
import {PricePairModel} from '../models/price-pair.model';
import {EntityMapperService} from './entity-mapper.service';



@Injectable({
  providedIn: 'root'
})
export class StockService implements  OnDestroy  {


  private readonly stockDataSource = new BehaviorSubject<StockDataModel[]>([]);
  readonly stockData$ = this.stockDataSource.asObservable();
  dataUpdateSubscription: Subscription;
  feedsUpdateDate?: Date = null;





  constructor(private httpService: HttpService, private entityMapperService: EntityMapperService) {
    this.initData();
  }

  initData(): void{
    // emit value in sequence every X second

    // .interval(environment.updateIntervalInSeconds)
    // .timeInterval()
    // .flatMap(() => this.notificationService.getNotifications(this.token))
    // .subscribe(data => {
    //   console.log(data);
    // });
    // const source = interval(environment.updateIntervalInSeconds);
    // this.dataUpdateSubscription = source.subscribe(val => {
    //   this.httpService.getStocks().subscribe((stocks: StockDataModel[]) => {
    //     this.stocks = stocks;
    //   });
    // });

    this.httpService.getStocks().pipe(
      map((data: any[]) => data.map(this.entityMapperService.mapStock))
    ).subscribe((stocks: StockDataModel[]) => {
      stocks.forEach((stock) => {
        stock.PricePair = [];
      });
      this.stocks = stocks;
    });



    const source = interval(environment.updateIntervalInSeconds * 1000).pipe(startWith(0)).subscribe(val => {
      this.refreshFeeds();
    });


  }

  private refreshFeeds(): void{
    console.log('refreshFeeds');
    this.httpService.getFeeds(this.feedsUpdateDate).subscribe((feeds: FeedsModel) => {
      for (let i = 0; i < feeds.Feeds.length; i++){
        feeds.Feeds[i] =  this.entityMapperService.mapFeed(feeds.Feeds[i]);
      }
      this.feedsUpdateDate = feeds.LastUpdate;
      this.processFeeds(feeds.Feeds);
    });
  }

  processFeeds(feeds: FeedModel[]): void{

    const stocks: StockDataModel[] = this.stocks;

    feeds.forEach((feed) => {
      const curStock =  stocks.find((stock) => stock.Id === feed.StockId);
      if (curStock){

        // feed found for this stock
        // check if price has updated

        if ((curStock.SellPrice !== feed.SellPrice || curStock.BuyPrice !== feed.BuyPrice) && curStock.BuyPrice && curStock.SellPrice ){
          // update the history;
          const PricePair: PricePairModel = {BuyPrice: curStock.BuyPrice, SellPrice: curStock.SellPrice };

          if (curStock.PricePair.length > environment.maxPriceHistory - 1) {
            curStock.PricePair.shift();
          }
          curStock.PricePair.push(PricePair);
        }
        curStock.SellPrice = feed.SellPrice;
        curStock.BuyPrice = feed.BuyPrice;
      }
    });
    this.stocks = stocks;
  }

  set stocks(stocksData: StockDataModel[]) {
    this.stockDataSource.next(stocksData);
  }

  get stocks(): StockDataModel[] {
    return this.stockDataSource.getValue();
  }

  public getStock(id: number): StockDataModel{
    return this.stockDataSource.getValue().find(stock => stock.Id === id);
  }




  ngOnDestroy(): void {
    this.dataUpdateSubscription.unsubscribe();
  }

}
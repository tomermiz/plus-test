import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {StockDataModel} from '../models/stock-data.model';
import {FeedModel} from '../models/feed.model';
import {FeedsModel} from '../models/feeds.model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }


  getStocks(): Observable<StockDataModel[]> {
    return this.http.get<any>(environment.stocksApi + 'stock');
  }

  getFeeds(lastTS?: Date): Observable<FeedsModel> {
    // todo which date format needs to be passed? null?
    //const dataParam = (lastTS === null) ? '' :   '?date=' + lastTS.toString();
    const dataParam  = '';
    return this.http.get<any>(environment.stocksApi + 'feeds' + dataParam);
  }
}

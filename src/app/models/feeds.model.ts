import {FeedModel} from './feed.model';

export interface FeedsModel {
  LastUpdate: Date;
  Feeds: FeedModel[];
}

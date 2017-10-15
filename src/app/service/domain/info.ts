import { UserProfile } from './userprofile';
import { Review } from './review';

export interface Info {
  id: string;
  title: string;
  content: string;
  userProfile: UserProfile;
  imageList: Array<string>;
  movie: string;
  external: boolean;
  publishTime: Date;
  lastReviewTime: Date;
  favorites: number;
  praise: number;
  praiseList: Array<UserProfile>;
  belittle: number;
  belittleList: Array<UserProfile>;
  lastModifyTime: Date;
  reviews: Array<Review>;
  isPraise: boolean;
  isBelittle: boolean;
  isFavorite: boolean;
}

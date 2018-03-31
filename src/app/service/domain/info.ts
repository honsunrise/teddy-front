import {UserProfile} from './userprofile';

export interface Info {
  id: string;
  title: string;
  content: string;
  userProfile: UserProfile;
  coverList: string[];
  movieUrl: string;
  external: boolean;
  realUrl: boolean;
  publishTime: Date;
  lastReviewTime: Date;
  lastModifyTime: Date;
  watchCount: number;
  isThumbUp: boolean;
  thumbUps: number;
  thumbUpList: UserProfile[];
  isThumbDown: boolean;
  thumbDowns: number;
  thumbDownList: UserProfile[];
  isFavorite: boolean;
  favorites: number;
  favoriteList: UserProfile[];
}

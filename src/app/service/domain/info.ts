import { UserProfile } from './userprofile';

export interface Info {
  id: string;
  title: string;
  content: string;
  userProfile: UserProfile;
  imageList: Array<string>;
  movieUrl: string;
  external: boolean;
  publishTime: Date;
  lastReviewTime: Date;
  lastModifyTime: Date;
  watchCount: number;
  isThumbUp: boolean;
  thumbUps: number;
  thumbUpList: Array<UserProfile>;
  isThumbDown: boolean;
  thumbDowns: number;
  thumbDownList: Array<UserProfile>;
  isFavorite: boolean;
  favorites: number;
  favoriteList: Array<UserProfile>;
}

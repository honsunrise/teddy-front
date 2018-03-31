import {UserProfile} from './userprofile';
import {Info} from './info';

export interface Review {
  id: string;
  info: Info;
  userProfile: UserProfile;
  content: String;
  publishTime: Date;
  praise: number;
  praiseList: Array<UserProfile>;
  belittle: number;
  belittleList: Array<UserProfile>;
  atList: Array<UserProfile>;
}

export enum GenderType {
  MAN, WOMAN, UNKNOWN
}

export interface UserProfile {
  uid: string;
  firstname: string;
  lastname: string;
  avatarUrl: string;
  bio: string;
  birthday: Date;
  gender: GenderType;
  updateDate: Date;
}

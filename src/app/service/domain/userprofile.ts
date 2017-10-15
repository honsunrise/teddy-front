export enum GenderType {
  MAN, WOMAN, UNKNOWN
}

export interface UserProfile {
  uid: string;
  firstName: string;
  lastName: string;
  avatarUrl: Map<string, string>;
  description: string;
  birthday: Date;
  gender: GenderType;
  updateDate: Date;
}

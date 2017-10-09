export class Media {
  title: string;
  content: string;
  coverUrl: string;
  likes: number;
  param?: any;
  onClickFavorite: (param: any) => void;
  onClickWatch: (param: any) => void;
}

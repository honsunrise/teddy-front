export class Media {
  title: string;
  content: string;
  coverUrl: string;
  favorites: number;
  isFavorite: boolean;
  param?: any;
  onClickFavorite: (param: any) => void;
  onClickWatch: (param: any) => void;
}

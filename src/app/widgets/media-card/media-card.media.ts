export class Media {
  title: string;
  content: string;
  coverUrl: string;
  favorites: number;
  watchCount: number;
  isFavorite: boolean;
  onClickFavorite: (isFavorite: boolean) => void;
  onClickWatch: () => void;
}

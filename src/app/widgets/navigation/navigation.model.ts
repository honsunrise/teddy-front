export class BadgeItem {
  num: number;
  bg: number;
  fg: number;
}

export class BaseItem {
  id: string;
  type: string;
  icon: string;
  title: string;
  badge: BadgeItem;
}

export class NavigationItem extends BaseItem {
  url: string;
  click: () => void;
}

export class NavigationGroup extends BaseItem {
  children: Array<NavigationItem>;
}

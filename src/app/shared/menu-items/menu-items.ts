import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: '/',
    name: 'HOME',
    type: 'link',
    icon: 'explore'
  },
  {
    state: 'cate',
    name: 'CATE',
    type: 'link',
    icon: 'local_library'
  },
  {
    state: 'playlist',
    name: 'MEDIA_LIBRARY',
    type: 'sub',
    icon: 'pages',
    children: [
      {state: 'later', name: 'WATCH_LATER'},
      {state: 'thumbUp', name: 'THUMB_UP'},
    ]
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}

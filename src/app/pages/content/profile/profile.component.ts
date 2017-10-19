import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  favorites = 0;
  thumbUp = 0;
  thumbDown = 0;

  constructor() {
  }

  ngOnInit() {
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlayListComponent implements OnInit, OnDestroy {
  private sub: any;
  private type: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.type = params['type'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-framed-content',
  styles: [':host {\n' +
  '  display: block;\n' +
  '  width: 100%;\n' +
  '  height: 100%;\n' +
  '}'],
  template: `<iframe #iframe [src]="externalUrl | safeUrl" frameborder="0" allowfullscreen style="width: 100%; height: 100%"></iframe>`
})
export class FramedContentComponent implements OnInit {
  @ViewChild('iframe') iframe: ElementRef;
  @Input() externalUrl: string;

  constructor() {
  }

  ngOnInit() {
  }
}

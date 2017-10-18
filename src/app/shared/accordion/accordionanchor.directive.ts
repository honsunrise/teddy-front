import { Directive, HostListener, Inject } from '@angular/core';

import { AccordionLinkDirective } from './accordionlink.directive';

@Directive({
  selector: '[appAccordionToggle]'
})
export class AccordionAnchorDirective {

  protected navLink: AccordionLinkDirective;

  constructor(@Inject(AccordionLinkDirective) navLink: AccordionLinkDirective) {
    this.navLink = navLink;
  }

  @HostListener('click', ['$event'])
  onClick(e: any) {
    this.navLink.toggle();
  }
}

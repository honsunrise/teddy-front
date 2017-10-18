import { AfterContentChecked, Directive } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { AccordionLinkDirective } from './accordionlink.directive';

@Directive({
  selector: '[appAccordion]',
})
export class AccordionDirective implements AfterContentChecked {

  protected navLinks: Array<AccordionLinkDirective> = [];

  constructor(private router: Router) {
    setTimeout(() => this.checkOpenLinks());
  }

  closeOtherLinks(openLink: AccordionLinkDirective): void {
    this.navLinks.forEach((link: AccordionLinkDirective) => {
      if (link !== openLink) {
        link.open = false;
      }
    });
  }

  addLink(link: AccordionLinkDirective): void {
    this.navLinks.push(link);
  }

  removeGroup(link: AccordionLinkDirective): void {
    const index = this.navLinks.indexOf(link);
    if (index !== -1) {
      this.navLinks.splice(index, 1);
    }
  }

  checkOpenLinks() {
    this.closeOtherLinks(null);
    this.navLinks.forEach((link: AccordionLinkDirective) => {
      if (link.group) {
        const routeUrl = this.router.url;
        if (routeUrl === link.group) {
          link.open = true;
        } else {
          const currentUrl = routeUrl.split('/');
          if (currentUrl.indexOf(link.group) > 0) {
            link.open = true;
          }
        }
      }
    });
  }

  ngAfterContentChecked(): void {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(e => this.checkOpenLinks());
  }
}

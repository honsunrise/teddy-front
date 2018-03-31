import {AfterContentChecked, Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[delayShow]'
})
export class DelayShowDirective implements AfterContentChecked {
  @Input()
  delayShow = 200;

  isCreated = false;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private element: ElementRef) {
  }

  ngAfterContentChecked() {
    if (document.body.contains(this.element.nativeElement) && !this.isCreated) {
      setTimeout(() => {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }, this.delayShow);
      this.isCreated = true;
    } else if (this.isCreated && !document.body.contains(this.element.nativeElement)) {
      this.viewContainer.clear();
      this.isCreated = false;
    }
  }
}

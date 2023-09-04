import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMostVisitsHighlight]',
})
export class MostVisitsHighlightDirective {
  @Input('appMostVisitsHighlight') isHighlighted: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.isHighlighted) {
      // this.renderer.setStyle(this.el.nativeElement, 'background-color', 'yellow');
      this.renderer.setStyle(this.el.nativeElement, 'color', 'danger');
      this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
    }
  }
}

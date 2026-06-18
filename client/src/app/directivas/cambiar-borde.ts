import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCambiarBorde]',
})
export class CambiarBorde {
  @Input() appBordeFoco: string = '#2acaaa';
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @HostListener('focus') 
  onFocus() {
    this.renderer.setStyle(this.el.nativeElement, 'borderColor', this.appBordeFoco);
    this.renderer.setStyle(this.el.nativeElement, 'boxShadow', `0 0 0 0.25rem ${this.appBordeFoco}25`); // Sombra suave
  }

  @HostListener('blur') 
  onBlur() {
    this.renderer.removeStyle(this.el.nativeElement, 'borderColor');
    this.renderer.removeStyle(this.el.nativeElement, 'boxShadow');
  }
}

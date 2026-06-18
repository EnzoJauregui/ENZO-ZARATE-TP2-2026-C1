import { Directive, ElementRef, Renderer2, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appEscalarTexto]',
})
export class EscalarTexto implements OnInit {
  @Input() tamañoMaximo: string = '26px';
  private tamañoOriginal: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.tamañoOriginal = this.el.nativeElement.style.fontSize || '14px';
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'font-size 0.2s ease');
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'fontSize', this.tamañoMaximo);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'fontSize', this.tamañoOriginal);
  }
}

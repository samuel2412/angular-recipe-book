import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  /* My solution
  showDropdown: boolean = false
  @HostBinding('class') elClass: string = 'btn-group'

  constructor () { }

  @HostListener('click') toggleOpen () {
    this.showDropdown = !this.showDropdown
    if(this.showDropdown){
      this.elClass = "btn-group open"
    } else {
      this.elClass = "btn-group"
    }
  } */
  @HostBinding('class.open') isOpen: boolean = false;

  @HostListener('click') toggleOpen () {
    this.isOpen = !this.isOpen
  }

}

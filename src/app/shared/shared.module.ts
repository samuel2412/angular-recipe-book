import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component'
import { DropdownDirective } from './dropdown.directive';
import { AlertComponent } from './alert/alert.component'
import { PlaceholderDirective } from './placeholder/placeholder.directive'

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  providers: [],
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component'

import { ShoppingListRoutingModule } from './shopping-list-routing.module'
import { SharedModule } from '../shared/shared.module'


@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    FormsModule,
    ShoppingListRoutingModule
  ],
  exports: [],
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  providers: [],
})
export class ShoppingListModule { }

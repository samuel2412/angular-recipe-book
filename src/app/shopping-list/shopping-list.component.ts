import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';

import * as ShoppingListActions from './store/shopping-list.actions'
import * as fromApp from '../store/app.reducer'


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList')
    /* this.ingredients = this.shoppingListService.getIngredients()
    this.subscription = this.shoppingListService.ingredientsChange.subscribe((ingredients: Ingredient[])=>{
      this.ingredients = ingredients
    }) */
  }

  onEditItem(index: number){
    //this.shoppingListService.startedEditing.next(index);
    this.store.dispatch( new ShoppingListActions.StartEdit(index) )
  }

}

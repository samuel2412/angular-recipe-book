import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions'
import * as fromShoppingList from '../store/shopping-list.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy{
  @ViewChild('form',{static: false}) form: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(){
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editIngredientIndex > -1){
        this.editMode = true
        this.editedItem = stateData.editIngredient
        this.form.setValue({
          //name: this.editedItem.name,
          //amount: this.editedItem.amount
           ...this.editedItem
         })
      } else {
        this.editMode = false
      }
    })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
    this.store.dispatch( new ShoppingListActions.StopEdit() )
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount)
    if(this.editMode){
      //this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient)
      this.store.dispatch( new ShoppingListActions.UpdateIngredient( newIngredient ) )
    } else {
      //this.shoppingListService.addIngredient(newIngredient)
      this.store.dispatch( new ShoppingListActions.AddIngredient( newIngredient ) )
    }
    this.onClear()
  }

  onClear() {
    this.editMode = false
    this.form.resetForm()
    this.store.dispatch( new ShoppingListActions.StopEdit() )
  }

  onDelete(){
    if(confirm()){
      //this.shoppingListService.deleteIngredient(this.editedItemIndex)
      this.store.dispatch( new ShoppingListActions.DeleteIngredient() )
      this.onClear()
    }
  }
}

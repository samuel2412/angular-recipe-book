import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy{
  @ViewChild('form',{static: false}) form: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(){
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index
        this.editedItem = this.shoppingListService.getIngredient(index)
        this.form.setValue({
         /*  name: this.editedItem.name,
          amount: this.editedItem.amount */
          ...this.editedItem
        })
      }
    );
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount)
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient)
    } else {
      this.shoppingListService.addIngredient(newIngredient)
    }
    this.onClear()
  }

  onClear() {
    this.editMode = false
    this.form.resetForm()
  }

  onDelete(){
    if(confirm()){
      this.shoppingListService.deleteIngredient(this.editedItemIndex)
      this.onClear()
    }
  }
}

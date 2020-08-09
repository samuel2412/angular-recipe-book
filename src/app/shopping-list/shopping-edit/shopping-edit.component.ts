import { Component } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  constructor(private shoppingListService: ShoppingListService) { }

  onAddItem(name: string, amount: number){
    const newIngredient = new Ingredient(name,amount)
    this.shoppingListService.addIngredient(newIngredient)
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model'
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddToShoppingList () {
    /* this.recipe.ingredients.map(el => {
      this.slService.addIngredient(el)
    }) */
    this.slService.addIngredients(this.recipe.ingredients)
  }

}

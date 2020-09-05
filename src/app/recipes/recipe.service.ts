import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import * as  ShoppingListActions from '../shopping-list/store/shopping-list.actions'
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer'

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()
  private recipes: Recipe[] = []

    constructor(private store: Store<fromShoppingList.AppState>){}

    addIngredientsToShoppingList(ingredients: Ingredient[]){
      this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
    }

    getRecipes() {
        return [...this.recipes]
    }

    setRecipes(recipes: Recipe[]){
      this.recipes = recipes
      this.recipesChanged.next([...this.recipes])
    }

    getRecipe (index: number){
        return {...this.recipes[index]}
    }

    addRecipe(recipe: Recipe){
      this.recipes.push(recipe)
      this.recipesChanged.next([...this.recipes])
    }

    updateRecipe(index: number, recipe: Recipe){
      this.recipes[index] = recipe
      this.recipesChanged.next([...this.recipes])
    }

    deleteRecipe(index:number){
      this.recipes.splice(index,1)
      this.recipesChanged.next([...this.recipes])
    }
}

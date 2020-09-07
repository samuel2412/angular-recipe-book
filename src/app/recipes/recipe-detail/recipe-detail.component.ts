import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from '../recipe.model'
import * as fromApp from '../../store/app.reducer'
import * as RecipesActions from '../store/recipe.actions'
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions'
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number
  constructor(private route: ActivatedRoute,private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params
    .pipe(
      map(params => params.id
      ),
      switchMap(id => {
        this.id = +id
        return this.store.select('recipes')
      }),
      map(recipesState => {
        return recipesState.recipes.find((el,index) => index === this.id)
      })
    ).subscribe(recipe =>{
        this.recipe = recipe
    })
  }

  onAddToShoppingList () {
    this.store.dispatch( new ShoppingListActions.AddIngredients(this.recipe.ingredients) )
  }
  onDelete(){
    this.store.dispatch( new RecipesActions.DeleteRecipe(this.id) )
    this.router.navigateByUrl('/recipes')
  }

}

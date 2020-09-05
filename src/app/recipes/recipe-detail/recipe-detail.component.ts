import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number
  constructor(private recipeService: RecipeService ,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params: Params)=>{
      this.id = params.id
      this.recipe = this.recipeService.getRecipe(this.id)
    })
  }

  onAddToShoppingList () {
    /* this.recipe.ingredients.map(el => {
      this.slService.addIngredient(el)
    }) */
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }
  onDelete(){
    this.recipeService.deleteRecipe(this.id)
    this.router.navigateByUrl('/recipes')
  }

}

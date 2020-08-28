import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()
    private recipes: Recipe[] = [
        new Recipe(
            'Burguer',
            'cheese burguer with onions',
            'https://f088b146830a59b5.cdn.gocache.net/uploads/noticias/2020/03/10/rf6288t949m0.jpg',
            [
                new Ingredient ('Meat',1),
                new Ingredient ('Bread',1),
                new Ingredient ('Onion',1),
                new Ingredient ('Cheese',1)
            ]
        ),
        new Recipe(
            'Hot Dog',
            'Bread, sausage and ketchup',
            'https://img.cybercook.com.br/receitas/243/cachorro-quente-completo-1-623x350.jpeg',
            [
                new Ingredient ('sausage',1),
                new Ingredient ('Bread',1),
                new Ingredient ('Ketchup',1)
            ]
        )
    ];

    getRecipes() {
        return [...this.recipes]
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

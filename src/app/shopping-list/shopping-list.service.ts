import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


export class ShoppingListService {
    ingredientsChange = new Subject<Ingredient[]>()
    startedEditing = new Subject<Number>()
    private ingredients: Ingredient[] = [
        new Ingredient('Apples',2),
        new Ingredient('Tomatoes',5)
    ];

    getIngredients(){
        return [...this.ingredients]
    }

    getIngredient(index: number) {
      return this.ingredients[index]
    }

    addIngredient (ingredient: Ingredient){
        this.ingredients.push(ingredient)
        this.ingredientsChange.next([...this.ingredients])
    }

    addIngredients (ingredients: Ingredient[]){
        this.ingredients.push(...ingredients)
        this.ingredientsChange.next([...this.ingredients])
    }

    updateIngredient(index: number, newIngredient: Ingredient){
      this.ingredients[index] = newIngredient
      this.ingredientsChange.next([...this.ingredients])
    }

    deleteIngredient(index: number){
      this.ingredients.splice(index,1)
      this.ingredientsChange.next([...this.ingredients])
    }
}

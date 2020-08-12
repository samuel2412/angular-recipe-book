import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


export class ShoppingListService {
    ingredientsChange = new Subject<Ingredient[]>()
    private ingredients: Ingredient[] = [
        new Ingredient('Apples',2),
        new Ingredient('Tomatoes',5)
    ];

    getIngredients(){
        return [...this.ingredients]
    }

    addIngredient (ingredient: Ingredient){
        this.ingredients.push(ingredient)
        this.ingredientsChange.next([...this.ingredients])
    }

    addIngredients (ingredients: Ingredient[]){
        this.ingredients.push(...ingredients)
        this.ingredientsChange.next([...this.ingredients])
    }
}
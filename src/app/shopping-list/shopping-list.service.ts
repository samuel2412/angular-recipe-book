import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    ingredientsChange = new EventEmitter<Ingredient[]>()
    private ingredients: Ingredient[] = [
        new Ingredient('Apples',2),
        new Ingredient('Tomatoes',5)
    ];

    getIngredients(){
        return [...this.ingredients]
    }

    addIngredient (ingredient: Ingredient){
        this.ingredients.push(ingredient)
        this.ingredientsChange.emit([...this.ingredients])
    }

    addIngredients (ingredients: Ingredient[]){
        this.ingredients.push(...ingredients)
        this.ingredientsChange.emit([...this.ingredients])
    }
}
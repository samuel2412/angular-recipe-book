import { Ingredient } from '../../shared/ingredient.model'

import * as ShoppingListActions from './shopping-list.actions'

export interface State {
  ingredients: Ingredient[],
  editIngredient: Ingredient,
  editIngredientIndex: number
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples',2),
    new Ingredient('Tomatoes',5)
  ],
  editIngredient: null,
  editIngredientIndex: -1
}


const shoppingListReducer = (state: State = initialState, action: ShoppingListActions.ShoppingListActions) => {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      }

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editIngredientIndex]
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      }
      const updatedIngredients = [...state.ingredients]
      updatedIngredients[state.editIngredientIndex] = updatedIngredient
      return {
        ...state,
        ingredients: updatedIngredients,
        editIngredient: null,
        editIngredientIndex: -1
      }

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((el,index) => index !== state.editIngredientIndex),
        editIngredient: null,
        editIngredientIndex: -1
      }
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editIngredient: {...state.ingredients[action.payload]},
        editIngredientIndex: action.payload
      }
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editIngredient: null,
        editIngredientIndex: -1
      }
    default:
      return state;
  }
}

export { shoppingListReducer }

import { Recipe } from '../recipe.model'
import * as RecipesAction from './recipe.actions'

export interface State {
  recipes: Recipe[]
}

const initialState: State = {
  recipes:[]
}

const recipeReducer = (state = initialState, action: RecipesAction.RecipesActions) => {
  switch (action.type) {
    case RecipesAction.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      }

    case RecipesAction.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      }

    case RecipesAction.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe
      }
      const updatedRecipes = [...state.recipes]
      updatedRecipes[action.payload.index] = updatedRecipe
      return {
        ...state,
        recipes: updatedRecipes
      }

      case RecipesAction.DELETE_RECIPE:
        return {
          ...state,
          recipes: state.recipes.filter((el,index) => index !== action.payload )
        }

    default:
      return state
  }
}

export { recipeReducer }

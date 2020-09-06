import { User } from '../user.model'
import * as AuthActions from './auth.actions'

export interface State {
  user: User,
  authError: string,
  loading: boolean
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
}

const authReducer = (state = initialState, action: AuthActions.AuthActions ) => {
  switch (action.type) {
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      }

    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      )
      return {
        ...state,
        authError: null,
        loading: false,
        user
      }

    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      }

    case AuthActions.LOGOUT:
      return {
        ...state,
        authError: null,
        user: null
      }

    default:
     return state
  }
}

export { authReducer }

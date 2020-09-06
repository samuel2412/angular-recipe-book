import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions'
import { environment } from '../../../environments/environment'

export interface AuthResponseData {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered?: boolean
}

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient, private router: Router){}

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap( (authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        map(respData => {
          const expirationDate = new Date(new Date().getTime() + +respData.expiresIn * 1000)
          return new AuthActions.Login({
            email: respData.email,
            userId: respData.localId,
            token: respData.idToken,
            expirationDate
           })
        }),
        catchError(errorResp => {
          let errorMessage = 'An unknow error occurred!'

          if(!errorResp.error || !errorResp.error.error){
            return of( new AuthActions.LoginFail(errorMessage) )
          }

          switch(errorResp.error.error.message){
            case 'EMAIL_EXISTS':
              errorMessage = 'This email already exists'
              break;
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'This email does not exists'
            break;
            case 'INVALID_PASSWORD':
              errorMessage = 'This password is not correct'
            break;
            default:
              errorMessage = 'An unknow error occurred!'
          }

          return of( new AuthActions.LoginFail( errorMessage ) )
        })
      )
    })
  )

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(()=>{
      this.router.navigateByUrl('/')
    })
  )
}

import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions'
import { environment } from '../../../environments/environment'
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered?: boolean
}

const handleAuthentication = (email: string, userId: string, token: string, expiresIn: number) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
  const user = new User(email, userId, token, expirationDate)
  localStorage.setItem('userData', JSON.stringify(user) )
  return new AuthActions.AuthenticateSuccess({
    email,
    userId,
    token,
    expirationDate,
    redirect: true
  })
}

const handleError = (errorResp: any) => {
  let errorMessage = 'An unknow error occurred!'

  if(!errorResp.error || !errorResp.error.error){
    return of( new AuthActions.AuthenticateFail(errorMessage) )
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

  return of( new AuthActions.AuthenticateFail( errorMessage ) )
}

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService){}


  @Effect()
  authSignup = this.actions$.pipe(
    ofType( AuthActions.SIGNUP_START ),
    switchMap( (signupAction: AuthActions.SignupStart ) => {
      return this.http.post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
        {
          email: signupAction.payload.email,
          password: signupAction.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        tap((respData)=>{
          this.authService.setLogoutTimer(+respData.expiresIn * 1000)
        }),
        map(respData => {
          return handleAuthentication(respData.email,respData.localId,respData.idToken, +respData.expiresIn)
        }),
        catchError(errorResp => {
          return handleError(errorResp)
        })
      )
    })
  )

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
        tap((respData)=>{
          this.authService.setLogoutTimer(+respData.expiresIn * 1000)
        }),
        map(respData => {
          return handleAuthentication(respData.email,respData.localId,respData.idToken, +respData.expiresIn)
        }),
        catchError(errorResp => {
          return handleError(errorResp)
        })
      )
    })
  )

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess)=>{
      if(authSuccessAction.payload.redirect){
        this.router.navigateByUrl('/')
      }
    })
  )

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(()=>{
      const user:{
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string
      } = JSON.parse(localStorage.getItem('userData'))
      if(!user) return { type: 'dummy' }
      const loadedUser = new User(
        user.email,
        user.id,
        user._token,
        new Date(user._tokenExpirationDate)
      )
      if(loadedUser.token){
        const expirationDuration = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new AuthActions.AuthenticateSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate:  new Date(user._tokenExpirationDate),
            redirect: false
        })
      }
      return { type: 'dummy' }
    })
  )

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(()=>{
      this.authService.clearLogoutTimer()
      localStorage.removeItem('userData')
      this.router.navigateByUrl('/auth')
    })
  )
}

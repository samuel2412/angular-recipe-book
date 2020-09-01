import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators'
import { throwError, BehaviorSubject } from 'rxjs'
import { User } from './user.model'
import { Router } from '@angular/router'

export interface AuthResponseData {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered?: boolean
}

@Injectable({
  providedIn:'root'
})
export class AuthService{
  user = new BehaviorSubject<User>( null )
  private timeout: any

  constructor(private http: HttpClient, private router: Router){}

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyALyuDW0vFmGOyP5GdMgtdOJViYxHDeKEk`,
      { email, password, returnSecureToken: true }
    ).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        })
    )
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyALyuDW0vFmGOyP5GdMgtdOJViYxHDeKEk`,
      { email,password, returnSecureToken: true }
    ).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        })
      )
  }

  autoLogin(){
    const user:{
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('user'))
    if(!user) return
    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    )
    if(loadedUser.token){
      this.user.next(loadedUser)
      const expiresIn = new Date(user._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expiresIn)
    }
  }

  logout(){
    this.user.next(null)
    localStorage.removeItem('user')
    this.router.navigateByUrl('/auth')
    if(this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
  }

  autoLogout(expirationDuration: number){
    this.timeout = setTimeout(()=>{
      this.logout()
    }, expirationDuration)
  }

  private handleError(errorResp: HttpErrorResponse){
    let errorMessage = 'An unknow error occurred!'

      if(!errorResp.error || !errorResp.error.error){
        return throwError(errorMessage)
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
      return throwError(errorMessage)
  }

  private handleAuthentication (email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expirationDate)
    localStorage.setItem('user', JSON.stringify(user) )
    this.user.next(user)
    this.autoLogout(expiresIn * 1000)
  }

}

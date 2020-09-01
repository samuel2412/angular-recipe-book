import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLogin = !this.isLogin
  }

  onSubmit(form: NgForm){
    this.isLoading = true
    const { email, password } = form.value

    let authObservable: Observable<AuthResponseData> = this.isLogin ? this.authService.login(email,password) :  this.authService.signup(email,password)

    authObservable.subscribe(responseData => {
      console.log(responseData)
      this.isLoading = false;
      this.router.navigateByUrl('/recipes')
    }, errorMessage => {
      console.log(errorMessage)
      this.error = errorMessage
      this.isLoading = false;
    })

    form.reset()
  }


}

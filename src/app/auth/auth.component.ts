import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service'
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AlertComponent } from '../shared/alert/alert.component'
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer'
import * as AuthActions from './store/auth.actions'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogin: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective
  private subscription: Subscription

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactory: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading
      this.error = authState.authError
      if(this.error){
        this.showErrorAlert(this.error)
      }
    })
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  onSwitchMode(){
    this.isLogin = !this.isLogin
  }

  onSubmit(form: NgForm){
    this.isLoading = true
    const { email, password } = form.value

    if(this.isLogin){
      this.store.dispatch(new AuthActions.LoginStart({ email, password }))
    } else {

    /* const authObservable = this.authService.signup(email,password)
    authObservable.subscribe(responseData => {
      console.log(responseData)
      this.isLoading = false;
      this.router.navigateByUrl('/recipes')
    }, errorMessage => {
      console.log(errorMessage)
      this.error = errorMessage
      this.showErrorAlert(errorMessage)
      this.isLoading = false;
    }) */
  }
    form.reset()
  }

  onHandleError(){
    this.error = null
  }

  private showErrorAlert(message: string){
    const alertComponentFactory =  this.componentFactory.resolveComponentFactory( AlertComponent )
    const hostRef = this.alertHost.viewContainerRef

    hostRef.clear();

    const componentRef = hostRef.createComponent(alertComponentFactory)

    componentRef.instance.message = message
    this.subscription = componentRef.instance.close.subscribe(()=>{
      this.subscription.unsubscribe()
      hostRef.clear()
    });
  }


}

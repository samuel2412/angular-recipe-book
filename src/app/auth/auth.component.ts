import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
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
  private storeSub: Subscription

  constructor(
    private componentFactory: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
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
    this.storeSub.unsubscribe()
  }

  onSwitchMode(){
    this.isLogin = !this.isLogin
  }

  onSubmit(form: NgForm){
    const { email, password } = form.value

    if(this.isLogin){
      this.store.dispatch( new AuthActions.LoginStart({ email, password }) )
    } else {
      this.store.dispatch( new AuthActions.SignupStart({ email, password }) )
    }
    form.reset()
  }

  onHandleError(){
    this.store.dispatch( new AuthActions.ClearError() )
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

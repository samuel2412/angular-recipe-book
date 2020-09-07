import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer'
import * as AuthActions from '../auth/store/auth.actions'
import * as RecipesActions from '../recipes/store/recipe.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription
  isAuthenticated: boolean = false
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth')
    .pipe(
      map(authState => authState.user)
    )
    .subscribe(user => {
      this.isAuthenticated = !!user
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe()
  }

  onSaveData(){
    this.store.dispatch( new RecipesActions.StoreRecipes() )
  }

  onFetchData(){
    this.store.dispatch( new RecipesActions.FetchRecipes() )
  }

  onLogout(){
    this.store.dispatch( new AuthActions.Logout() )
  }


}

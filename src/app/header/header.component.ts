import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { DataStorageService } from '../shared/data-storage.service'
import { AuthService } from '../auth/auth.service'
import * as fromApp from '../store/app.reducer'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription
  isAuthenticated: boolean = false
  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) { }

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
    this.dataStorageService.storeRecipes()
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe()
  }

  onLogout(){
    this.authService.logout()
  }


}

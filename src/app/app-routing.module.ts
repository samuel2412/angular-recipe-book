import { NgModule } from '@angular/core'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'

const routes: Routes = [
  {
    path:'',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then( module => {
      return module.RecipesModule
    }) //lazy loading
    //older versions : loadChildren: './recipes/recipes.module#RecipesModule'
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(module => {
      return module.ShoppingListModule
    })
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(module => {
      return module.AuthModule
    })
  }
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule {

}

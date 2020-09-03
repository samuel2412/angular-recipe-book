import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { RecipesComponent } from './recipes.component'
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component'
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component'
import { RecipesStartComponent } from './recipes-start/recipes-start.component'
import { RecipesResolverService } from './recipes-resolver.service'
import { AuthGuard } from '../auth/auth.guard'


const routes: Routes = [
  {
    path:'',//lazy loading - path está no app-routing
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path: '',
        component: RecipesStartComponent
      },
      {
        path:'new',
        component: RecipeEditComponent
      },
      {
        path:':id',
        component: RecipeDetailComponent,
        resolve:[RecipesResolverService]
      },
      {
        path:':id/edit',
        component: RecipeEditComponent,
        resolve:[RecipesResolverService]
      },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class RecipesRoutingModule { }

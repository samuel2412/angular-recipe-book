import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('miojo','miojo de galinha','https://uploads.metropoles.com/wp-content/uploads/2016/07/02172559/miojo12.jpg'),
    new Recipe('miojo','miojo de carne','https://uploads.metropoles.com/wp-content/uploads/2016/07/02172559/miojo12.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

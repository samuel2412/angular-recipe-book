import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toRecipe = new EventEmitter<boolean>()
  constructor() { }

  ngOnInit(): void {
  }

  toRecipes(){
    this.toRecipe.emit(true)
  }
  toShoppingList(){
    this.toRecipe.emit(false)
  }

}

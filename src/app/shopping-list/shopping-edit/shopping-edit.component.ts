import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() newItem = new EventEmitter<Ingredient>()
  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(name: string, amount: number){
    this.newItem.emit({name, amount})
  }
}

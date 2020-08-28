import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  isEdit: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id
      this.isEdit = params.id != null;
      this.initForm()
    })
  }

  private initForm(){
    const recipe = this.isEdit ? this.recipeService.getRecipe(this.id) : new Recipe('','','',[]);
    const ingredients = new FormArray([])
    if(recipe['ingredients']){
      recipe.ingredients.map(el=>{
        ingredients.push(new FormGroup({
          'name': new FormControl(el.name,Validators.required),
          'amount': new FormControl(el.amount,[
            Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
          ]),
        }))
    })
  }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe.name,Validators.required),
      'imagePath': new FormControl(recipe.imagePath,Validators.required),
      'description': new FormControl(recipe.description,Validators.required),
      'ingredients': ingredients
    });
  }

  onSubmit(){
    /*const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients
      ); */
   if(this.isEdit){
     this.recipeService.updateRecipe(this.id,this.recipeForm.value)
   } else {
     this.recipeService.addRecipe(this.recipeForm.value)
   }
   this.onCancel()
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null,Validators.required),
      'amount': new FormControl(null,[
        Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
    }))
  }
  onCancel(){
    this.recipeForm.reset()
    this.router.navigate(['../'],{relativeTo: this.route})
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}

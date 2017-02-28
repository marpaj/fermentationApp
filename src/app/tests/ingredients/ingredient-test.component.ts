import { Component, Input, OnInit } from '@angular/core';

import { Test, IngredientTested } from '../test';

@Component({
  moduleId: module.id,
  selector: 'ingredient-test',
  templateUrl: 'ingredient-test.component.html',
  styleUrls: [ 'ingredient-test.component.css' ]
})

export class IngredientTestComponent implements OnInit {
	@Input()
	test: Test;

	selectedIngredient: IngredientTested;
	
	// private _status = 'reading';

	// ingredients: Ingredient[];

	// @Input()
	// set status(status: string) {
	// 	if (status!='reading') {
	// 		this.ingredientService.getIngredients()
	// 			.then(ingredients => {
	// 				this.ingredients = ingredients;
	// 				// Filtering ingredients already added
	// 				if (this.recipe.ingredients) {
	// 					for (let ri of this.recipe.ingredients) {
	// 						this.ingredients = this.ingredients.filter(i => i.id !== ri.id);
	// 					}
	// 				}
	// 			});
	// 	}
	// 	// Save the new status from the parent component
	// 	this._status = status;
	// }
	
	// get status(): string {
	// 	return this._status;
	// }

	// constructor(private ingredientService: IngredientService) {}
	
	ngOnInit(): void {
	}

	edit(ingredientTested: IngredientTested) {
		this.selectedIngredient = ingredientTested;
	}

	duplicate(ingredientTested: IngredientTested) {
		let newIT: IngredientTested = new IngredientTested();
		newIT.ingredient = ingredientTested.ingredient;
		
		for (let )

		this.test.ingredientsTested.

	}

	addParameter() {

	}

	deleteParameter() {

	}
	
	// It receives a number parameter because select does not return the whole object
	// addIngredient(idIngredient: number): void {
	// 	if (!idIngredient) { return; }
		
	// 	// Get the selected ingredient from ingredient list (Filter method return an array)
	// 	let ingredients = <Ingredient[]>this.ingredients.filter(i => i.id == idIngredient);
		
	// 	// Add the new ingredient to the recipe		
	// 	this.recipe.ingredients.push(ingredients[0]);
				
	// 	// Filtering in ingredient list to display only ingredients no added
	// 	this.ingredients = this.ingredients.filter(i => i.id !== ingredients[0].id);
		
	// 	// if (!idIngredient) { return; }
	// 	// this.ingredientService.addToRecipe(this.recipe.id, idIngredient)
	// 		// .then(ingredient => {
	// 			// this.recipe.ingredients.push(ingredient);
				
	// 			// // Filtering this.ingredients to display only ingredients no added
	// 			// this.ingredients = this.ingredients.filter(i => i.id !== ingredient.id);
	// 		// });
	// }
	
	// delete(ingredient: Ingredient): void {
	// 	if (!ingredient) { return; }
		
	// 	// Remove from recipe's ingredient list
	// 	this.recipe.ingredients = this.recipe.ingredients.filter(i => i.id !== ingredient.id);
				
	// 	// Filtering in ingredient list to display only ingredients no added
	// 	this.ingredients.push(ingredient);
		
	// 	// this.ingredientService
	// 		// .delete(recipe, ingredient)
	// 		// .then(() => {
	// 			// this.recipe.ingredients = this.recipe.ingredients.filter(i => i !== ingredient);
				
	// 			// // Filtering this.ingredients to display only ingredients no added
	// 			// this.ingredients.push(ingredient);
	// 		// });
	// }

}

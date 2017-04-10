import { Component, Input, OnInit } from '@angular/core';

import { Test, IngredientTested, Parameter, ParameterTested } from '../test';
import { TestService } from "app/tests/test.service";

@Component({
  moduleId: module.id,
  selector: 'ingredient-test',
  templateUrl: 'ingredient-test.component.html',
  styleUrls: [ 'ingredient-test.component.css' ]
})

export class IngredientTestComponent implements OnInit {
	@Input()
	test: Test;

	parameters: Parameter[];

	selectedIngredient: IngredientTested;

	constructor(private testService: TestService) {}

	
	ngOnInit(): void {
		this.initializeParameters();
	}

	// Initialize parameter select for the current direction tested
	private initializeParameters(): void {
		this.testService.getParameters().then(parameters => {
			this.parameters = parameters;
		});
	}

	edit(ingredientTested: IngredientTested) {
		this.selectedIngredient = ingredientTested;
	}

	duplicate(ingredientTested: IngredientTested) {
		let newIT: IngredientTested = new IngredientTested();
		newIT.ingredient = ingredientTested.ingredient;
		
	}

	// Add a parameterTested to the ingredient tested list
	addParameterTested(ingredientTested: IngredientTested, idParameter: number, value: string): void {
		if (!idParameter || !value) { return; }
		
		// Get the parameter selected (Note: filter method return an array)
		let parameters = <Parameter[]>this.parameters.filter(i => i.id == idParameter);
		
		// Add new parameter tested to the current direction tested
		let parameterTested = new ParameterTested(parameters[0], value);
		ingredientTested.parametersIngredient.push(parameterTested);
	}

	// Delete a parameterTested to the ingredient tested list
	deleteParameterTested(ingredientTested: IngredientTested, parameterTested: ParameterTested): void {
		if (!parameterTested) { return; }
		
		// Remove from parameterTested list of ingredientTested
		ingredientTested.parametersIngredient = 
			ingredientTested.parametersIngredient.filter(pt => pt.parameter.id !== parameterTested.parameter.id);
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

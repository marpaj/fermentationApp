import { Component, Input, OnInit } from '@angular/core';

import { Test, DirectionTested, Parameter, ParameterTested } from '../test';

import { TestService } from '../test.service';

@Component({
    moduleId: module.id,
    selector: 'direction-test',
    templateUrl: 'direction-test.component.html',
    styleUrls: [ 'direction-test.component.css' ]
})

export class DirectionTestComponent implements OnInit {
	@Input()
	test: Test;

    parameters: Parameter[];

    currentDirection: number;

    // private _status = 'reading';
    // 
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
	// 
	// get status(): string {
	// 	return this._status;
	// }

	constructor(private testService: TestService) {}
	
	ngOnInit(): void {
        // Initialize current direction Tested to 1
        if (this.test.directionsTested && this.test.directionsTested.length>0) {
            this.testService.getCurrentDirection(this.test.id).then(currentDt => {
				this.currentDirection = currentDt.direction.order;
				
				this.initializeParameters(currentDt);
			});
        } else {
            this.currentDirection = 1;
            this.initializeParameters(null);
        }
	}

    // Initialize parameter select for the current direction tested
	private initializeParameters(directionTested: DirectionTested): void {
		this.testService.getParameters().then(parameters => {
			this.parameters = parameters;

			// Filtering parameter select to display only parameters no added
			if (directionTested) {
				for (let parameterTested of directionTested.parametersTested) {
					this.parameters = this.parameters.filter(i => i.id !== parameterTested.parameter.id);
				}
			}
		});
	}

    // Add a parameterTested to the direction tested and initialize the parameter select
	addParameterTested(directionTested: DirectionTested, idParameter: number, value: string): void {
		if (!idParameter) { return; }
		
		// Get the parameter selected (Filter method return an array)
		let parameters = <Parameter[]>this.parameters.filter(i => i.id == idParameter);
		
		// Add new parameter tested to the current direction tested
		let parameterTested = new ParameterTested(parameters[0], value);
		directionTested.parametersTested.push(parameterTested);
				
		// Filtering in parameter select to display only parameters no added
		this.parameters = this.parameters.filter(i => i.id !== parameters[0].id);
	}

	// Delete a parameterTested to the direction tested and initialize the parameter select
	deleteParameterTested(directionTested: DirectionTested, parameterTested: ParameterTested): void {
		if (!parameterTested) { return; }
		
		// Remove from parameterTested list of DirectionTested
		directionTested.parametersTested = directionTested.parametersTested.filter(pt => pt.parameter.id !== parameterTested.parameter.id);
				
		// Filtering in parameter select to display only parameters no added
		this.parameters.push(parameterTested.parameter);
	}

	// Go to the next direction tested
	goNextDirection(): void {
		// this.testService.getParameters().then(parameters => this.parameters = parameters);

		// Save done variable to true for the current direction tested
		this.test.directionsTested[this.currentDirection-1].done = true;

		this.currentDirection++;

		this.initializeParameters(this.test.directionsTested[this.currentDirection-1]);
	}

	// Go back to the last direction tested
	goBackDirection(): void {
		this.currentDirection--;
		// this.testService.getParameters().then(parameters => this.parameters = parameters);

		// Change done variable to false for the last direction tested
		this.test.directionsTested[this.currentDirection-1].done = false;

		this.initializeParameters(this.test.directionsTested[this.currentDirection-1]);
	}

	isCurrentDirection(direcTested: DirectionTested): boolean {
		return direcTested === this.test.directionsTested[this.currentDirection-1];
	}
	
	// // It receives a number parameter because select does not return the whole object
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

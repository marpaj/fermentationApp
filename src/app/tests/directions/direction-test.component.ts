import { Component, Input, OnInit } from '@angular/core';

import { Test, DirectionTested, Parameter, ParameterTested } from '../test';

import { TestService } 		from '../test.service';
import { DirectionService }	from '../../recipes/directions/direction.service';

@Component({
    moduleId: module.id,
    selector: 'direction-test',
    templateUrl: 'direction-test.component.html',
    styleUrls: [ 'direction-test.component.css' ]
})

export class DirectionTestComponent implements OnInit {
	@Input()
	test: Test;

	@Input()
	idRecipe: number;

    parameters: Parameter[];

    currentDirection: number;

    /* 
	@Input()
	set test(test: Test) {
		if (test) {
			console.log('Hay algo en test: directions:'+test.directionsTested.length);
			this.testService.getCurrentDirection(this.test.id).then(currentDt => {
				this.currentDirection = currentDt.direction.order;
				
				this.initializeParameters(currentDt);
			});
	 	} else {
			console.log('Nada en test');
		}
	 	// Save the new status from the parent component
		this._test = test;
	}
	
	get test(): Test {
		return this._test;
	}*/

	constructor(private testService: TestService, private directionService: DirectionService) {}

	ngOnInit(): void {
		//this.test = new Test();


		// It will be a new test for a recipe when idRecipe has been sending
		if (this.idRecipe) {
			this.initializeNewTest();

		// When there is not idRecipe, there will be a idTest
		} else {
			this.initialize();
		}
		/*else {
			this.testService.getTest(idTest).then(test => this.test = test);
		}*/


        /*// Initialize current direction Tested to 1
        if (this.test.directionsTested && this.test.directionsTested.length>0) {
			console.log('Hay algo en test');
            this.testService.getCurrentDirection(this.test.id).then(currentDt => {
				this.currentDirection = currentDt.direction.order;
				this.testService.getTest(idTest).then(test => this.test = test);
				this.initializeParameters(currentDt);
			});
        } else {
			console.log('Nada en test');
            this.currentDirection = 1;
            this.initializeParameters(null);
        }*/
	}

	initialize(): void {
        // Initialize current direction Tested to 1
        if (this.test.directionsTested && this.test.directionsTested.length>0) {
			console.log('child initialize: before getcurrentDirection');
            this.testService.getCurrentDirection(this.test.id).then(currentDt => {
				this.currentDirection = currentDt.direction.order;
				
				this.initializeParameters(currentDt);
				console.log('child initialize: after getcurrentDirection');
			});
			console.log('child initialize: end');
        } else {
			console.log('Nada en test');
            this.currentDirection = 1;
            this.initializeParameters(null);
        }
	}

	initializeNewTest():void {
		// Direction list
		this.directionService.getDirectionsByRecipe(this.idRecipe)
			.then(directions => {
				for (let d of directions) {
					if (!d.deleted) {
						let dt = new DirectionTested();
						dt.direction = d;
						this.test.directionsTested.push(dt);
					}
				}
				console.log('Child ngInit: Hay directions:'+this.test.directionsTested.length);
				this.currentDirection = 1;
            	this.initializeParameters(null);
			});
	}

    // Initialize parameter select for the current direction tested
	private initializeParameters(directionTested: DirectionTested): void {
		this.testService.getParameters().then(parameters => {
			this.parameters = parameters;

			// Filtering parameter select to display only parameters no added
			if (directionTested) {
				for (let parameterTested of directionTested.parametersDirection) {
					this.parameters = this.parameters.filter(i => i.id !== parameterTested.parameter.id);
				}
			}
		});
	}

    // Add a parameterTested to the direction tested and initialize the parameter select
	addParameterTested(directionTested: DirectionTested, idParameter: number, value: string): void {
		if (!idParameter || !value) { return; }
		
		// Get the parameter selected (Filter method return an array)
		let parameters = <Parameter[]>this.parameters.filter(i => i.id == idParameter);
		
		// Add new parameter tested to the current direction tested
		let parameterTested = new ParameterTested(parameters[0], value);
		directionTested.parametersDirection.push(parameterTested);
				
		// Filtering in parameter select to display only parameters no added
		this.parameters = this.parameters.filter(i => i.id !== parameters[0].id);
	}

	// Delete a parameterTested to the direction tested and initialize the parameter select
	deleteParameterTested(directionTested: DirectionTested, parameterTested: ParameterTested): void {
		if (!parameterTested) { return; }
		
		// Remove from parameterTested list of DirectionTested
		directionTested.parametersDirection = directionTested.parametersDirection.filter(pt => pt.parameter.id !== parameterTested.parameter.id);
				
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

	// Return true if all the directions were completed
	isDirectionCompleted(): boolean {
		return this.currentDirection == this.test.directionsTested.length+1;
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

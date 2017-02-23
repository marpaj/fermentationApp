import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }             	from '@angular/common';

import { Recipe } 				from '../recipes/recipe';
import { Ingredient } 			from '../recipes/ingredients/ingredient';
import { Direction }			from '../recipes/directions/direction';
import { Test, Parameter, ParameterTested, IngredientTested, DirectionTested } from './test';

import { TestService }			from './test.service';
import { IngredientService }	from '../recipes/ingredients/ingredient.service';
import { DirectionService }		from '../recipes/directions/direction.service';

import 'rxjs/add/operator/switchMap';

@Component({
	moduleId: module.id,
	selector: 'test-detail',
	templateUrl: 'test-detail.component.html',
	styleUrls: [ 'test-detail.component.css' ]
})

export class TestDetailComponent implements OnInit {
	test: Test;
	
	idRecipe: number;
	
	parameters: Parameter[];

	errorMessages: string[];

	currentDirection: number;

	constructor(
		private testService: TestService,
		private ingredientService: IngredientService,
		private directionService: DirectionService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		// Initialize current direction Tested to 1
		this.currentDirection = 1;

		this.errorMessages = [];

		// Récupération des valeurs de l'URL
		this.route.params.subscribe(params => this.idRecipe = +params['idRecipe']);
		let idTest: number;
		this.route.params.subscribe(params => idTest = +params['idTest']);
		
		// It will be a new test for a recipe when idRecipe has been sending
		if (this.idRecipe) {
			// Initialize test
			this.test = new Test();

			// Ingredient list
			this.route.params
				this.ingredientService.getIngredientsByRecipe(this.idRecipe)
				.then(ingredients => {
					for (let i of ingredients) {
						let it = new IngredientTested();
						it.ingredient = i;
						this.test.ingredientsTested.push(it);
					}
				});
			
			// Direction list
			this.route.params
				this.directionService.getDirectionsByRecipe(this.idRecipe)
				.then(directions => {
					for (let d of directions) {
						if (!d.deleted) {
							let dt = new DirectionTested();
							dt.direction = d;
							this.test.directionsTested.push(dt);
						}
					}
				});

			// Initialize parameter list on directions tested selection
			this.initializeParameters(null);
			// this.testService.getParameters().then(parameters => this.parameters = parameters);

		// When there is not idRecipe, there will be a idTest
		} else {
			this.testService.getTest(idTest).then(test => this.test = test);
			this.testService.getCurrentDirection(idTest).then(currentDt => {
				this.currentDirection = currentDt.direction.order;
				
				this.initializeParameters(currentDt);
				// Filtering in parameter select to display only parameters no added
				// for (let parameterTested of currentDt.parametersTested) {
				// 	this.parameters = this.parameters.filter(i => i.id !== parameterTested.parameter.id);
				// }
			});
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

	// Go back to the last page
	goBack(): void {
		this.location.back();
	}

	// Save the test
	save(): void {
		if (!this.test.id) {
			this.testService.create(this.test, this.idRecipe).then(() => this.goBack());
		} else {
			this.testService.update(this.test).then(() => this.goBack());
		}
	}

	// Check if test is right to be save
	private isValidToClose(test: Test): boolean {
		let isValid:boolean = true;
		this.errorMessages = [];

		// to-do: vote is a number
		if (!this.test.vote || this.test.vote<=0) {
			this.errorMessages.push('Vote is required and it has to be more than 0.');
			isValid = false;
		}

		// Ingredients tested are required
		for (let it of test.ingredientsTested) {
			if (!it.amount || !it.units) {
				this.errorMessages.push('Every amount of ingredients are required.');
				isValid = false;
				break;
			}
		}

		// Directions tested are required
		if (this.currentDirection < this.test.directionsTested.length) {
			this.errorMessages.push('Every directions must be done.');
			isValid = false;
		}

		return isValid;
	}
	
	// Close the test: Vote field has to be fill up
	close(): void {
		if (this.isValidToClose(this.test)) {
			this.test.closed = true;
			this.save();
		}
	}
	
	// Delete the current test
	delete(): void {
		this.testService.delete(this.test.id).then(() => this.goBack());
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


}


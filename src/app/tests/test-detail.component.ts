import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }             	from '@angular/common';

import { Recipe } 				from '../recipes/recipe';
import { Ingredient } 			from '../recipes/ingredients/ingredient';
import { Direction }			from '../recipes/directions/direction';
import { Test, IngredientTested, DirectionTested } from './test';

import { TestService }			from './test.service';
import { IngredientService }	from '../recipes/ingredients/ingredient.service';
import { DirectionService }		from '../recipes/directions/direction.service';
import { DirectionTestComponent } from './directions/direction-test.component';

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

	errorMessages: string[];

	/*@ViewChild(DirectionTestComponent)
	private directionComponent: DirectionTestComponent;*/

	constructor(
		private testService: TestService,
		private ingredientService: IngredientService,
		private directionService: DirectionService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {

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
			this.ingredientService.getIngredientsByRecipe(this.idRecipe)
			.then(ingredients => {
				for (let i of ingredients) {
					let it = new IngredientTested();
					it.ingredient = i;
					this.test.ingredientsTested.push(it);
				}
			});
			
			// Direction list
			/*this.directionService.getDirectionsByRecipe(this.idRecipe)
				.then(directions => {
					for (let d of directions) {
						if (!d.deleted) {
							let dt = new DirectionTested();
							dt.direction = d;
							this.test.directionsTested.push(dt);
						}
					}
					console.log('Parent ngInit: En test hay '+this.test.directionsTested.length +' directions');
					this.directionComponent.initialize(this.test);
			});*/

		// When there is not idRecipe, there will be a idTest
		} else {
			this.testService.getTest(idTest).then(test => this.test = test);
		}
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

		// // Ingredients tested are required
		// for (let it of test.ingredientsTested) {
		// 	if (!it.amount || !it.units) {
		// 		this.errorMessages.push('Every amount of ingredients are required.');
		// 		isValid = false;
		// 		break;
		// 	}
		// }

		// // Directions tested are required
		// if (this.currentDirection < this.test.directionsTested.length) {
		// 	this.errorMessages.push('Every directions must be done.');
		// 	isValid = false;
		// }

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

}


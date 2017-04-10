import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { BrowserModule } 			from '@angular/platform-browser';

import { RecipeService } from './recipe.service';
import { TestService } from '../tests/test.service';
import { Recipe } from './recipe';
import { Test } from '../tests/test';

import 'rxjs/add/operator/switchMap';

@Component({
	moduleId: module.id,
	selector: 'my-recipe-detail',
	templateUrl: 'recipe-detail.component.html',
	styleUrls: [ 'recipe-detail.component.css' ]
})

export class RecipeDetailComponent implements OnInit {
	recipe: Recipe;
	
	test: Test;
	
	activeTest: Test;

	errorMessages: string[];
	
	//Status for the form: reading, editing and creating
	status: string;

	constructor(
		private recipeService: RecipeService,
		private testService: TestService,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location
	) {}

	ngOnInit(): void {
		// Initialize errorMessage
		this.errorMessages = [];

		// Initialize recipe to create or to update
		let idRecipe: number;
		this.route.params.subscribe(params => idRecipe = +params['id']);
		
		// If idRecipe exists, it will be a read only mode
		if (idRecipe) {
			this.getRecipe(idRecipe);
			
			this.testService.getBestTest(idRecipe).then(test => this.test = test);
			this.testService.getActiveTest(idRecipe).then(test => this.activeTest = test);
		} 
		// If not (idRecipe does not exist), it will be a CREATE mode
		else {
			this.recipe = new Recipe();
			this.test = new Test();
			this.status = 'creating';
		}
	}

	private getRecipe(idRecipe: number): void {
		this.recipeService.getRecipe(idRecipe).then(recipe => {
			this.recipe = recipe;
			
			// Display only direction no deleted
			for (let direction of this.recipe.directions) {
				if (direction.deleted) {
					this.recipe.directions = this.recipe.directions.filter(i => i.id !== direction.id)
				}
			}

			// Status will be only read
			this.status = 'reading';
		});
	}

	goBack(): void {
		this.location.back();
	}
	
	// Edit mode for the form
	edit(): void {
		this.status = 'editing';
	}
	
	// cancel mode for editing form
	cancel(): void {
		this.getRecipe(this.recipe.id);
	}
	
	// Save the recipe with ingredients
	save(): void {
		if (this.isValidRecipe()) {
			// New recipe
			if (this.recipe.id) {
				this.recipeService.update(this.recipe).then(() => this.status='reading');//this.goBack());
			}	
			// Update recipe
			else {
				this.recipeService.create(this.recipe).then(() => this.status='reading');//this.goBack());
			}
		}
	}

	gotoNewTest(recipe: Recipe): void {
		let link = ['/test', {idRecipe: recipe.id}];
		this.router.navigate(link);
	}

	gotoTest(recipe: Recipe): void {
		let link;
		if (recipe) {
			link = ['/tests', recipe.id];
		} else {
			console.log('test: ' +this.activeTest.id);
			link = ['/test', {idTest: this.activeTest.id}];
		}
		this.router.navigate(link);
	}

	isValidRecipe(): boolean {
		// Initialize error List
		this.errorMessages = [];

		let isValid:boolean = true;
		if (!this.recipe.name || this.recipe.name=='') {
			this.errorMessages.push('Name is required.');
			isValid = false;
		}
		return isValid;
	}

	isSaveButtonEnabled(): boolean {
		return this.status!='reading';
	}

	isEditButtonEnabled(): boolean {
		return this.status=='reading';
	}

	isCancelButtonEnabled(): boolean {
		return this.status=='editing';
	}

	isNewTestButtonEnabled(): boolean {
		return this.status=='reading'
				&& !this.activeTest
				&& this.recipe.ingredients.length>0 
				&& this.recipe.directions.length>0;
	}

	isTestsButtonEnabled(): boolean {
		return this.test 
				&& this.test.closed 
				&& this.status=='reading';
	}

	isActiveTestButtonEnabled(): boolean {
		return this.activeTest && this.status=='reading';
	}
}

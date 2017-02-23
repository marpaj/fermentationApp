import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';

import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';

@Component({
	moduleId: module.id,
	selector: 'my-recipes',
	templateUrl: 'recipes.component.html',
	styleUrls: [ 'recipes.component.css' ]
})

export class RecipesComponent implements OnInit {
	recipes: Recipe[];
	selectedRecipe: Recipe;

	constructor(
		private router: Router,
		private recipeService: RecipeService
	) {}

	getRecipes(): void {
		this.recipeService.getRecipes().then(recipes => this.recipes = recipes);
	}

	ngOnInit(): void {
		this.getRecipes();
	}

	onSelect(recipe: Recipe): void {
		this.selectedRecipe = recipe;
	}

	gotoNewRecipe(): void {
		this.router.navigate(['/recipe', '']);
	}
}

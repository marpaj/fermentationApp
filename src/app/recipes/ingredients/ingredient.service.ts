import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import 'rxjs/add/operator/toPromise';

import { Ingredient } from './ingredient';

import { Recipe } from '../recipe';

@Injectable()
export class IngredientService {
	
	private ingredientRecipeUrl = 'http://127.0.0.1:8000/recipes';  // URL to web api
	private ingredientsUrl = 'http://127.0.0.1:8000/ingredients/';  // URL to web api
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
	
	getIngredients(): Promise<Ingredient[]> {
		return this.http.get(this.ingredientsUrl)
			.toPromise()
			.then(response => response.json() as Ingredient[])
			.catch(this.handleError);
	}
	
	getIngredientsByRecipe(idRecipe: number): Promise<Ingredient[]> {
		const url = `${this.ingredientRecipeUrl}/${idRecipe}/ingredients/`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Ingredient[])
			.catch(this.handleError);
	}
	
	addToRecipe(idRecipe: number, idIngredient: number): Promise<Ingredient> {
		const url = `${this.ingredientRecipeUrl}/${idRecipe}/ingredients/`;
		return this.http
			.post(url, JSON.stringify({id:idIngredient}), {headers: this.headers})
			.toPromise()
			.then(res => res.json() as Ingredient)
			.catch(this.handleError);
	}
	
	delete(recipe: Recipe, ingredient: Ingredient): Promise<void> {
		const url = `${this.ingredientRecipeUrl}/${recipe.id}/ingredients/${ingredient.id}/`;
		return this.http.delete(url, {headers: this.headers})
		  .toPromise()
		  .then(() => null)
		  .catch(this.handleError);
	}
}
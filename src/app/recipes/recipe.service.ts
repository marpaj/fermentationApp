import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Recipe } from './recipe';

@Injectable()
export class RecipeService {
  
  private recipesUrl = 'http://127.0.0.1:8000/recipes';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getRecipes(): Promise<Recipe[]> {
    return this.http.get(this.recipesUrl)
      .toPromise()
      .then(response => response.json() as Recipe[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getRecipe(id: number): Promise<Recipe> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Recipe)
      .catch(this.handleError);
  }
  
  create(recipe: Recipe): Promise<Recipe> {
	const url = `${this.recipesUrl}/`;
	return this.http
		.post(url, JSON.stringify(recipe), {headers: this.headers})
		.toPromise()
		.then(() => recipe)
		.catch(this.handleError);
  }

  update(recipe: Recipe): Promise<Recipe> {
	const url = `${this.recipesUrl}/${recipe.id}/`;
	return this.http
		.put(url, JSON.stringify(recipe), {headers: this.headers})
		.toPromise()
		.then(() => recipe)
		.catch(this.handleError);
  }
}

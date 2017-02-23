import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import 'rxjs/add/operator/toPromise';

import { Direction } from './direction';

import { Recipe } from '../recipe';

@Injectable()
export class DirectionService {
	
	private directionRecipeUrl = 'http://127.0.0.1:8000/recipes';  // URL to web api
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
	
	getDirectionsByRecipe(idRecipe: number): Promise<Direction[]> {
		const url = `${this.directionRecipeUrl}/${idRecipe}/directions/`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Direction[])
			.catch(this.handleError);
	}
}
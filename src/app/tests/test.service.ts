import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Test, Parameter, DirectionTested } from './test';

@Injectable()
export class TestService {
	private recipeTestUrl = 'http://127.0.0.1:8000/recipes';  // URL to web api
	private testUrl = 'http://127.0.0.1:8000/tests';  // URL to web api
	private parametersUrl = 'http://127.0.0.1:8000/parameters';  // URL to web api
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http) { }
	
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}

	getTests(idRecipe: number): Promise<Test[]> {
		const url = `${this.recipeTestUrl}/${idRecipe}/tests`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Test[])
			.catch(this.handleError);
	}

	getTest(idTest: number): Promise<Test> {
		const url = `${this.testUrl}/${idTest}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Test)
			.catch(this.handleError);
	}
	
	getBestTest(idRecipe: number): Promise<Test> {
		const url = `${this.recipeTestUrl}/${idRecipe}/bestTest/`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Test)
			.catch(this.handleError);
	}
	
	getActiveTest(idRecipe: number): Promise<Test> {
		const url = `${this.recipeTestUrl}/${idRecipe}/activeTest/`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Test)
			.catch(this.handleError);
	}

	update(test: Test): Promise<Test> {
		const url = `${this.testUrl}/${test.id}/`;
		return this.http
			.put(url, JSON.stringify(test), {headers: this.headers})
			.toPromise()
			.then(() => test)
			.catch(this.handleError);
	}

	create(test: Test, idRecipe: number): Promise<Test> {
		const url = `${this.recipeTestUrl}/${idRecipe}/tests/`;
		return this.http
			.post(url, JSON.stringify(test), {headers: this.headers})
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);
	}
	
	delete(idTest: number): Promise<void> {
		const url = `${this.testUrl}/${idTest}/`;
		return this.http
			.delete(url, {headers: this.headers})
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}
	
	getParameters(): Promise<Parameter[]> {
		const url = `${this.parametersUrl}/`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Parameter[])
			.catch(this.handleError);
	}

	getCurrentDirection(idTest: number): Promise<DirectionTested> {
		const url = `${this.testUrl}/${idTest}/currentDirection/`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as DirectionTested)
			.catch(this.handleError);
	}
}

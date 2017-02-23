import { Ingredient } from './ingredients/ingredient';
import { Direction } from './directions/direction';
import { Test } from '../tests/test';

export class Recipe {
	id: number;
	name: string;
	description: string;
	ingredients: Ingredient[];
	directions: Direction[];
	tests: Test[];
  
	constructor() {
		this.ingredients = [];
		this.directions = [];
		this.tests = [];
	}
}
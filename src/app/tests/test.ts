import { Direction } from '../recipes/directions/direction';
import { Ingredient } from '../recipes/ingredients/ingredient';

export class Test {
	id: number;
	vote: number;
	description: string;
	date: string;
	closed: boolean;
	ingredientsTested: IngredientTested[];
	directionsTested: DirectionTested[];
	
	constructor() {
		this.ingredientsTested = [];
		this.directionsTested = [];
	}
	
	// TO-DO: when time is number and not string
	// Calculate total time 
	// time(): number {
		// let time = 0;
		// for (let dTested of this.directionsTested) {
			// time += dTested.time;
		// }
		// return time;
	// }
}

export class IngredientTested {
	ingredient: Ingredient;
	parametersIngredient: ParameterTested[];

	constructor() {
		this.parametersIngredient = [];
	}
}

export class DirectionTested {
	direction: Direction;
	parametersDirection: ParameterTested[];
	done: boolean;
	
	constructor() {
		this.parametersDirection = [];
		this.done = false;
	}
}

export class Parameter {
	id: number;
	name: string;
}

export class ParameterTested {
	id: number;
    parameter: Parameter;
	value: string;

	constructor(parameter: Parameter, value: string) {
		this.parameter = parameter;
		this.value = value;
	}
}

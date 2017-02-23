import { Component, Input } from '@angular/core';

import { Test, IngredientTested } from './test';

@Component({
	moduleId: module.id,
	selector: 'best-test',
	templateUrl: 'best-test.component.html',
	styleUrls: [ 'best-test.component.css' ]
})

export class BestTestComponent {
	@Input()
	test: Test;
	
	@Input()
	status: string;
}

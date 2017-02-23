import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Test } from './test';
import { TestService } from './test.service';

import 'rxjs/add/operator/switchMap';

@Component({
	moduleId: module.id,
	selector: 'my-tests',
	templateUrl: 'tests.component.html',
	styleUrls: [ 'tests.component.css' ]
})

export class TestsComponent implements OnInit {
	tests: Test[];
	selectedTest: Test;

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private testService: TestService
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.testService.getTests(+params['idRecipe']))
			.subscribe(tests => this.tests = tests);
	}

	onSelect(test: Test): void {
		this.selectedTest = test;
	}
	
	goBack(): void {
		this.location.back();
	}
}

import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from '../recipe';

import { Direction } from './direction';

@Component({
	moduleId: module.id,
	selector: 'direction-recipe',
	templateUrl: 'direction.component.html',
	styleUrls: [ 'direction.component.css' ]
})

export class DirectionComponent implements OnInit {
	@Input()
	recipe: Recipe;
	
	private _status: string;

	@Input()
	set status(status: string) {
		if (this.status!='reading') {
			// Next order will be 1 or directions.length+1
			if (this.recipe.directions.length > 0) {
				this.nextOrder = this.recipe.directions.length + 1;
			} else {
				this.nextOrder = 1;
			}
			this.currentOrder = 0;
		}
		// Save the new status from the parent component
		this._status = status;
	}
	
	get status(): string {
		return this._status;
	}

	currentOrder:  number;
	nextOrder: number;
	
	ngOnInit(): void {
	}
	
	// Add a new direction on list
	add(): void {
		this.recipe.directions.push(new Direction('', this.nextOrder++));
		this.currentOrder = this.nextOrder-1;
	}

	// Edit the direction with order passed by parameter
	edit(order: number): void {
		this.currentOrder = order;
	}

	// Save description for direction
	save(): void {
		this.recipe.directions[this.currentOrder-1].description = this.recipe.directions[this.currentOrder-1].description.trim();
		this.currentOrder = 0;
	}
	
	// Delete the direction passed by parameter
	delete(direction: Direction): void {
		if (!direction) { return; }
		
		// Remove from recipe's direction list
		this.recipe.directions = this.recipe.directions.filter(d => d.order !== direction.order);
		this.nextOrder--;
		this.currentOrder = 0;
		
		// Initialize order values on direction list
		let newOrder = 1;
		for (let direction of this.recipe.directions) {
			if (newOrder <= this.nextOrder) {
				direction.order = newOrder++;
			}
		}
	}

	isEditMode(direction: Direction): boolean {
		return this._status!='reading' && direction.order == this.currentOrder;
	}

	isDeleteButtonEnabled(direction: Direction): boolean {
		return this._status!='reading' && ( this.currentOrder==0 || direction.order==this.currentOrder );
	}

	isEditButtonEnabled(): boolean {
		return this._status!='reading' && this.currentOrder==0;
	}

	isAddButtonEnabled(): boolean {
		return this._status!='reading';// && this.currentOrder==0;
	}

	isSaveButtonEnabled(direction: Direction): boolean {
		return this._status!='reading' && this.currentOrder!=0 && direction.order==this.currentOrder;
	}
}

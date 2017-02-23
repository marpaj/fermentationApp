export class Direction {
	id: number;
	title: string;
	description: string;
	order: number;
	deleted: boolean;

	constructor(description: string, order: number) {
		this.description = description;
		this.order = order;
	}
}
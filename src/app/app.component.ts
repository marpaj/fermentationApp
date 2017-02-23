import { Component } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'app-root',
	template: `
		<h1>{{title}}</h1>
		<!-- <nav>
		<a routerLink="/recipes">Recipes</a>
		</nav> -->
		<router-outlet></router-outlet>
	`,
	styleUrls: ['app.component.css']
})

export class AppComponent  { 
	title = 'Fermentation App'; 
}

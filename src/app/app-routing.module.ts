import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { DashboardComponent }   from './dashboard.component';
import { RecipesComponent }			from './recipes/recipes.component';
import { RecipeDetailComponent }	from './recipes/recipe-detail.component';

import { TestsComponent }			from './tests/tests.component';
import { TestDetailComponent }		from './tests/test-detail.component';

const routes: Routes = [
	{ path: '', redirectTo: '/recipes', pathMatch: 'full' },
	//  { path: 'dashboard',  component: DashboardComponent },
	{ path: 'recipes',				component: RecipesComponent },
	{ path: 'recipe/:id',			component: RecipeDetailComponent },
	{ path: 'recipe',				component: RecipeDetailComponent },
	
	// Route to new test. For edit test view it is necessary to pass an optional parameter
	{ path: 'test',					component: TestDetailComponent },
	{ path: 'tests/:idRecipe',		component: TestsComponent },
	// { path: 'activeTest/:idTest',	component: TestDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

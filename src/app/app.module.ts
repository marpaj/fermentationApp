//import './rxjs-extensions';

import { NgModule }      			from '@angular/core';
import { BrowserModule } 			from '@angular/platform-browser';
import { FormsModule }   			from '@angular/forms';
import { HttpModule, JsonpModule }	from '@angular/http';

import { AppRoutingModule } 		from './app-routing.module';

import { AppComponent }         	from './app.component';
import { RecipesComponent }   		from './recipes/recipes.component';
import { RecipeDetailComponent }   	from './recipes/recipe-detail.component';
import { RecipeService }			from './recipes/recipe.service';

import { IngredientRecipeComponent } 	from './recipes/ingredients/ingredient-recipe.component';
import { IngredientService }			from './recipes/ingredients/ingredient.service';

import { DirectionComponent }			from './recipes/directions/direction.component';
import { DirectionService }				from './recipes/directions/direction.service';

import { TestsComponent }   			from './tests/tests.component';
import { TestDetailComponent }			from './tests/test-detail.component';
import { BestTestComponent }			from './tests/best-test.component';
import { IngredientTestComponent }		from './tests/ingredients/ingredient-test.component';
import { DirectionTestComponent }		from './tests/directions/direction-test.component';
import { TestService }					from './tests/test.service';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule,
		JsonpModule,
	],
	declarations: [
		AppComponent,
		RecipesComponent,
		RecipeDetailComponent,
		IngredientRecipeComponent,
		DirectionComponent,
		TestsComponent,
		TestDetailComponent,
		BestTestComponent,
		IngredientTestComponent,
		DirectionTestComponent
	],
	providers: [ RecipeService, IngredientService, DirectionService, TestService ],
	bootstrap: [ AppComponent ]
})

export class AppModule { }

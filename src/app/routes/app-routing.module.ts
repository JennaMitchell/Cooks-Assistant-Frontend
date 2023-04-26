import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'libs/auth/router/auth.gaurd';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../pages/homepage/homepage.module').then((m) => m.HomepageModule),
  },
  {
    path: 'recipe-creator',
    loadChildren: () =>
      import('../pages/recipe-creator/recipe-creator.module').then(
        (m) => m.RecipeCreatorModule
      ),
  },
  {
    path: 'recipe-browser',
    loadChildren: () =>
      import('../pages/recipe-browser/recipe-browser.module').then(
        (m) => m.RecipeBrowserModule
      ),
  },
  {
    path: 'recipe-viewer/:id',
    loadChildren: () =>
      import('../pages/recipe-viewer/recipe-viewer.module').then(
        (m) => m.RecipeViewerModule
      ),
  },
  { path: '**', redirectTo: '/' },
];

//      canActivate:[AuthGuard]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

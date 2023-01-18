import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full'
  },
  {
    path: 'games',
    loadChildren: () => import('./pages/games/games.module').then( m => m.GamesPageModule)
  },
  {
    path: 'games/:id', //changed from game-details to parameterised route using :id
    loadChildren: () => import('./pages/game-details/game-details.module').then( m => m.GameDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

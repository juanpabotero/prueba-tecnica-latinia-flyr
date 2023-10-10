import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './pages/character/character.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'characters',
    component: HomeComponent,
  },
  {
    path: 'characters/:id',
    component: CharacterComponent,
  },
  {
    path: '**',
    redirectTo: 'characters',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

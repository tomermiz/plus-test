import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './components/main/main.component';



const routes: Routes = [
  { path: '',   redirectTo: '/main', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'main', component: MainComponent },
  { path: '*', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

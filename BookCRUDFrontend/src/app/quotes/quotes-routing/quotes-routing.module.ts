import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListquoteComponent } from '../listquote/listquote.component';
import { AddquoteComponent } from '../addquote/addquote.component';


const routes: Routes = [
  { path: '', component: ListquoteComponent },
  { path: 'add', component: AddquoteComponent },
 //{ path: 'listLikedQuotes', component: AddquoteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotesRoutingModule { }
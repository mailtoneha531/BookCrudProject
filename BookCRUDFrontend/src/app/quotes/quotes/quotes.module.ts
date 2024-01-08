import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QuotesRoutingModule } from '../quotes-routing/quotes-routing.module';
import { ListquoteComponent } from '../listquote/listquote.component';
import { AddquoteComponent } from '../addquote/addquote.component';



@NgModule({
  declarations: [
    ListquoteComponent,
    AddquoteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuotesRoutingModule
  ]
})
export class QuotesModule { }

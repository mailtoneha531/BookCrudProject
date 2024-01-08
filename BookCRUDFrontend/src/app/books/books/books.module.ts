import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ListbookComponent } from '../listbook/listbook.component';
import { AddeditbookComponent } from '../addeditbook/addeditbook.component';
import { BooksRoutingModule } from '../books-routing/books-routing.module';



@NgModule({
  declarations: [
    ListbookComponent,
    AddeditbookComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BooksRoutingModule
  ]
})
export class BooksModule { }

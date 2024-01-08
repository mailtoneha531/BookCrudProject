import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from '../users-routing/users-routing.module';
import { ListComponent } from '../list/list.component';
import { AddEditComponent } from '../add-edit/add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule
    ],
    declarations: [
        ListComponent,
        AddEditComponent
    ]
})
export class UsersModule { }
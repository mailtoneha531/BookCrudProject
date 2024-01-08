import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddeditbookComponent } from '../addeditbook/addeditbook.component';
import { ListbookComponent } from '../listbook/listbook.component';


const routes: Routes = [
    { path: '', component: ListbookComponent },
    { path: 'add', component: AddeditbookComponent },
    { path: 'edit/:id', component: AddeditbookComponent }
];
//You import other NgModules so you can use their exported classes in component templates.
//You export this NgModule's classes so they can be imported and used by components of other NgModules.
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BooksRoutingModule { }
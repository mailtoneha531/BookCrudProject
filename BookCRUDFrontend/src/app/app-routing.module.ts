import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent, RegisterComponent } from './account';
import { BooksModule } from './books/books/books.module';
import { HomeComponent } from './home/home/home.component';
import { AuthGuard } from './_helpers';

const usersModule = () => import('./users/users/users.module').then(x => x.UsersModule);
const booksModule = () => import('./books/books/books.module').then(x => x.BooksModule);
const quotesModule = () => import('./quotes/quotes/quotes.module').then(x => x.QuotesModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'books', loadChildren: booksModule, canActivate: [AuthGuard] },
    { path: 'quotes', loadChildren: quotesModule, canActivate: [AuthGuard] },
    { path: 'account/login', component: LoginComponent },
    { path: 'account/register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
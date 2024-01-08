import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Book } from '@app/models/book';



@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookSubject: BehaviorSubject<Book | null>;
  public book: Observable<Book | null>;

  constructor(
    private router: Router,
        private http: HttpClient
  ) { 
    this.bookSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('book')!));
    this.book = this.bookSubject.asObservable();
  }

  public get bookValue() {
    return this.bookSubject.value;
  }

  login(bookname: string, password: string) {
    return this.http.post<Book>(`${environment.apiUrl}/books/authenticate`, { bookname, password })
        .pipe(map(book => {
            // store book details and jwt token in local storage to keep book logged in between page refreshes
            localStorage.setItem('book', JSON.stringify(book));
            this.bookSubject.next(book);
            return book;
        }));
  }

  logout() {
    // remove book from local storage and set current book to null
    localStorage.removeItem('book');
    this.bookSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  saveBook(book: Book) {
    return this.http.post(`${environment.apiUrl}/books/`, book);
  }
  
  getAll() {
    return this.http.get<Book[]>(`${environment.apiUrl}/books`);
}

getById(id: string) {
    return this.http.get<Book>(`${environment.apiUrl}/books/${id}`);
}

update(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}/books/${id}`, {"id":id,...params})
        .pipe(map(x => {
                const book = { ...this.bookValue, ...params };
                localStorage.setItem('book', JSON.stringify(book));

                // publish updated book to subscribers
                this.bookSubject.next(book);
            
            return x;
        }));
}

delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/books/${id}`)
        .pipe(map(x => {
            return x;
        }));
}
}

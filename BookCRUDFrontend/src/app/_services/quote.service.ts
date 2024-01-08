import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Quote } from '@app/models/quote';




@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private quoteSubject: BehaviorSubject<Quote | null>;
  public quote: Observable<Quote | null>;

  constructor(
    private router: Router,
        private http: HttpClient
  ) { 
    this.quoteSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('quote')!));
    this.quote = this.quoteSubject.asObservable();
  }

  public get quoteValue() {
    return this.quoteSubject.value;
  }

  saveQuote(quote: Quote) {
    let quoteObj  = {};
    if(quote.Liked=="true") {
      quoteObj = {...quote, "Liked": true}
    } else {
      quoteObj = {...quote, "Liked": false}
    }
    return this.http.post(`${environment.apiUrl}/quote`, quoteObj);
  }
  
  getAll() {
    const  contextUser = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.get<Quote[]>(`${environment.apiUrl}/quote`);
  }
}

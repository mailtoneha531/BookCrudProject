import { Component, OnInit } from '@angular/core';
import { QuoteService } from '@app/_services/quote.service';
import { ThemeService } from '@app/_services/theme.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-listquote',
  templateUrl: './listquote.component.html',
  styleUrls: ['./listquote.component.css']
})
export class ListquoteComponent implements OnInit {
  quotes: any[] = [];
  showLikedQuotes: boolean = false;
  showLikedFivePosts: any[] = [];

    constructor(private quoteService: QuoteService, private themeService: ThemeService) {}

    ngOnInit() {
        this.quoteService.getAll()
            .pipe(first())
            .subscribe(quotes => this.quotes = quotes);
    }
    listLikedQuotes() {
      this.showLikedFivePosts = this.quotes.slice().filter(item => item.liked).slice(0, 5); // Get the first 5 items;
      this.showLikedQuotes = true;
    }

      
    // deleteBook(id: string) {
    //     const user = this.quotes!.find(x => x.id === id);
    //     user.isDeleting = true;
    //     this.quoteService.delete(id)
    //         .pipe(first())
    //         .subscribe(() => this.books = this.books!.filter(x => x.id !== id));
    // }
    getTheme() {
      return this.themeService.getTheme();
    }
  
    getButtonColor() {
      return this.getTheme() === 'dark' ? 'var(--button-primary)' : 'var(--button-light)';
    }

    getBackgroundColor() {
      return this.getTheme() === 'dark' ? 'var(--background-light)' : 'var(--background-lightdark)';
    }
  
    getTextColor() {
      return this.getTheme() === 'dark' ? 'var(--text-light)' : 'var(--text-dark)';
    }
}
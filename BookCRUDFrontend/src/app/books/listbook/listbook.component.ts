import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { BookService } from '@app/_services/book.service ';
import { ThemeService } from '@app/_services/theme.service';


@Component({
  selector: 'app-listbook',
  templateUrl: './listbook.component.html',
  styleUrls: ['./listbook.component.css']
})
export class ListbookComponent implements OnInit {
    books?: any[];

    constructor(private bookService: BookService, private themeService: ThemeService) {}

    ngOnInit() {
        this.bookService.getAll()
            .pipe(first())
            .subscribe(books => this.books = books);
    }

    deleteBook(id: string) {
        const user = this.books!.find(x => x.id === id);
        user.isDeleting = true;
        this.bookService.delete(id)
            .pipe(first())
            .subscribe(() => this.books = this.books!.filter(x => x.id !== id));
    }

    toggleTheme() {
        this.themeService.toggleTheme();
      }
    
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
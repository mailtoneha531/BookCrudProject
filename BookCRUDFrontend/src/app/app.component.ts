import { Component } from '@angular/core';
import { User } from './models';
import { AccountService } from './_services';
import { ThemeService } from './_services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'book-crud';
  user?: User | null;

    constructor(private accountService: AccountService, private themeService: ThemeService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();
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
      return this.getTheme() === 'dark' ? 'var(--navbackground-light)' : 'var(--navbackground-dark)';
    }

    getIconColor() {
      return this.getTheme() === 'dark' ? 'var(--text-light)' : 'var(--button-primary)';
    }
  
    getTextColor() {
      return this.getTheme() === 'dark' ? 'var(--text-light)' : 'var(--text-dark)';
    }
    
}

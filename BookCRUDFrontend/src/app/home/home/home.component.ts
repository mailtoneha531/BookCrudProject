import { Component } from '@angular/core';
import { User } from '@app/models';
import { AccountService } from '@app/_services';
import { ThemeService } from '@app/_services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: User | null;

  constructor(private accountService: AccountService, private themeService: ThemeService) {
      this.user = this.accountService.userValue;
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

  getTextColor() {
    return this.getTheme() === 'dark' ? 'var(--text-light)' : 'var(--text-dark)';
  }
}

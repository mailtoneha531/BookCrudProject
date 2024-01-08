import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: 'dark' | 'light' = 'light';

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('dark-theme', this.currentTheme === 'dark');
  }

  getTheme(): 'dark' | 'light' {
    return this.currentTheme;
  }
}

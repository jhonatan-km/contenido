import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(this.isDarkMode());
  darkMode$ = this.darkMode.asObservable();
  
  constructor() {}
  
  toggleDarkMode(): void {
    const newValue = !this.darkMode.value;
    localStorage.setItem('darkMode', JSON.stringify(newValue));
    this.darkMode.next(newValue);
    
    if (newValue) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
  
  private isDarkMode(): boolean {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  }
  
  initializeTheme(): void {
    if (this.isDarkMode()) {
      document.body.classList.add('dark-theme');
    }
  }
}
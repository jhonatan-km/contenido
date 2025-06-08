import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isDarkMode = false;
  isSidebarOpen = false;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService
  ) {
    this.themeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    document.body.classList.toggle('sidebar-expanded');
  }

  logout(): void {
    this.authService.logout();
  }
}

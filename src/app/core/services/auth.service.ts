import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  
  constructor(private router: Router) {}
  
  login(email: string, password: string): boolean {
    // For demo purposes - in production this would call an API
    if (email === 'admin@gmail.com' && password === 'admin123') {
      localStorage.setItem('token', 'demo-token');
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }
  
  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }
  
  isAuthenticated(): boolean {
    return this.hasToken();
  }
  
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
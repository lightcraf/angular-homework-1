import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  username: string = '';

  constructor(
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.username === '') {
      this.router.navigate(['start']);
      return false;
    }
    return true;
  }

  setUsername(username: string): void {
    this.username = username;
  }
}
import { Injectable } from '@angular/core';
import { MessagingService } from '../service/messaging.service';

const TOKEN_KEY = 'AuthToken';
const FIREBASE_TOKEN_KEY = 'firebase_token';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  private apps: Array<string> = [];
  constructor(private messagingService: MessagingService) { }

  signOut() {
    const firebaseToken = window.sessionStorage.getItem(FIREBASE_TOKEN_KEY);
    this.messagingService.deleteToken(firebaseToken);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveFirebaseToken(firebaseToken: string) {
    window.sessionStorage.removeItem(FIREBASE_TOKEN_KEY);
    window.sessionStorage.setItem(FIREBASE_TOKEN_KEY, firebaseToken);
  }

  public getFirebaseToken(): string {
    return sessionStorage.getItem(FIREBASE_TOKEN_KEY);
  }


  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

 
  public getAuthorities(): string[] {
    this.roles = [];
    
    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }
 
}

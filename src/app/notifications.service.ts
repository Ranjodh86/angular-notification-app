import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationInfo } from './notifications/notification-info';
import { TokenInfo } from './notifications/token-info';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {

  private addTokenUrl = 'http://localhost:8080/notification-app/add_token';
  private removeTokenUrl = 'http://localhost:8080/notification-app/remove_token';
  private updateTokenUrl = 'http://localhost:8080/notification-app/update_token';
  private notificationReadUrl = 'http://localhost:8080/notification-app/notification_read';
  private notificationDeliveredUrl = 'http://localhost:8080/notification-app/notification_delivered';
  private getAllnotificationsUrl = 'http://localhost:8080/notification-app/get_notifications';

  addToken(tokenInfo: TokenInfo): Observable<string> {
    return this.http.post<string>(this.addTokenUrl, tokenInfo, httpOptions);
  }

  removeToken(token: String): Observable<string> {
    return this.http.post<string>(this.removeTokenUrl, token, httpOptions);
  }

  updateToken(tokenInfo: TokenInfo): Observable<string> {
    return this.http.post<string>(this.updateTokenUrl, tokenInfo, httpOptions);
  }

  notificationRead(tokenInfo: TokenInfo): Observable<string> {
    return this.http.post<string>(this.notificationReadUrl, tokenInfo, httpOptions);
  }

  notificationDelivered(notificationId: string): Observable<string> {
    return this.http.post<string>(this.notificationDeliveredUrl, notificationId, httpOptions);
  }

  getAllNotifications(tokenInfo: TokenInfo): Observable<[NotificationInfo]> {
    return this.http.post<[NotificationInfo]>(this.getAllnotificationsUrl, tokenInfo, httpOptions);
  }

  constructor(private http : HttpClient) { }
}

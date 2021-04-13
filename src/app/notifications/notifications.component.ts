import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationsService } from '../notifications.service';
import { TokenInfo } from './token-info';
import { NotificationInfo } from './notification-info';
import { environment } from 'src/environments/environment';


const USERNAME_KEY = 'AuthUsername';
const FIREBASE_TOKEN_KEY = "firebase_token";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class NotificationsComponent implements OnInit {

  notifications: any;
  tokenInfo: TokenInfo;

  constructor(private notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.getNotifications();
    this.notificationsRead();
    //console.log(navigator.userAgent.);
  }

  getNotifications(){


    const userAgentKeyword = getUserAgentKeyword(window.navigator.userAgent)
    this.tokenInfo = new TokenInfo(window.sessionStorage.getItem(USERNAME_KEY), window.sessionStorage.getItem(FIREBASE_TOKEN_KEY), environment.appName, userAgentKeyword, '127.0.0.1' );
    
     this.notificationService.getAllNotifications(this.tokenInfo).subscribe(
      data => {
         this.notifications = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  notificationsRead(){

    const userAgentKeyword = getUserAgentKeyword(window.navigator.userAgent)
    this.tokenInfo = new TokenInfo(window.sessionStorage.getItem(USERNAME_KEY), window.sessionStorage.getItem(FIREBASE_TOKEN_KEY), environment.appName, userAgentKeyword, '127.0.0.1' );
    
     this.notificationService.notificationRead(this.tokenInfo).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }


}


function getUserAgentKeyword(userAgent: string) {
  if(userAgent.includes('Edg/'))
  return 'Edge';
  else if (userAgent.includes('Firefox/'))
  return 'Firefox';
  else if (userAgent.includes('Chrome/'))
  return 'Chrome';
  else 
  return 'UnknownBrowser';
}


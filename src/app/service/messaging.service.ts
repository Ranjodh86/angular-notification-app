import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NotificationsService } from '../notifications.service';
import { TokenInfo } from '../notifications/token-info';
import { environment } from 'src/environments/environment';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

const USERNAME_KEY = 'AuthUsername';
const FIREBASE_TOKEN_KEY = "firebase_token";

@Injectable()
export class MessagingService {
currentMessage = new BehaviorSubject(null);
notificationId: string;
message: AngularFireMessaging;

tokenInfo: TokenInfo;
constructor(
  private angularFireMessaging : AngularFireMessaging,
    private notificationService: NotificationsService) {
this.angularFireMessaging.messages.subscribe(
(_messaging : AngularFireMessaging) => {
_messaging.onMessage = _messaging.onMessage.bind(_messaging);
_messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
}
)
}
requestPermission() {
this.angularFireMessaging.requestToken.subscribe(
(token) => {
    window.sessionStorage.setItem(FIREBASE_TOKEN_KEY,token);
    const userAgentKeyword = getUserAgentKeyword(window.navigator.userAgent)
    this.tokenInfo = new TokenInfo(window.sessionStorage.getItem(USERNAME_KEY), token, environment.appName, userAgentKeyword, '127.0.0.1' );
    this.notificationService.addToken(this.tokenInfo).subscribe(
        data => {
            console.log(data);
        },
        error => {
          console.log(error);
        }
      )

console.log(token);
},
(err) => {
console.error('Unable to get permission to notify.', err);
}
);
}

deleteToken(token) {
  console.log("token1 : " + token);
    this.angularFireMessaging.deleteToken(token).subscribe(
    () => {
      console.log("token2 : " + token);
    window.sessionStorage.removeItem(FIREBASE_TOKEN_KEY);
    console.info('Token removed');
    },
    (err) => {
    console.error('Token removal error.', err);
    }
    );
    console.log("token to be removed : " + token)
    this.notificationService.removeToken(token).subscribe(
      data => {
          console.log(data);
      },
      error => {
        console.log(error);
      }
    );
    }


receiveMessage() {
this.angularFireMessaging.messages.subscribe(
(payload) => {
console.log("new message received. ", payload);
console.log("payload[data] - " + payload['data']);

this.notificationId = payload['data'].notificationid;
console.log("this.notificationId - " + this.notificationId);
this.notificationService.notificationDelivered(this.notificationId).subscribe(
    data => {
        console.log(data);
    },
    error => {
      console.log(error);
    }
  )
this.currentMessage.next(payload);
})
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

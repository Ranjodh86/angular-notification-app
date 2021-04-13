export class NotificationInfo {
    body: string;
    deleivered: boolean;
    notificationId: string;
    read: boolean;
    title: string;
    
    constructor(body: string, deleivered: boolean, notificationId: string, read: boolean, title: string) {
        this.body = body;
        this.deleivered = deleivered;
        this.notificationId = notificationId;
        this.read = read;
        this.title = title;
    }
}

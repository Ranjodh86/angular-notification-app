export class TokenInfo {
    deviceType: string;
    macAddress: string;
    owningApp: string;
    token: string;
    username: string;
    
    constructor(username: string, token: string, owningApp: string, deviceType: string, macAddress: string) {
        this.username = username;
        this.deviceType = deviceType;
        this.owningApp = owningApp;
        this.token = token;
        this.macAddress = macAddress;
    }
}

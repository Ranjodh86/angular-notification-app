export class SignUpInfo {
    username: string;
    role: string[];
    app: string[];
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
        this.role = ['user'];
        this.app = ['wtp'];
    }
}

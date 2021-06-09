export class User {
    private _id: number;
    private _username: string;
    private _first_name: string;
    private _last_name: string;
    private _email: string;
    private _token: string;
    private _cached: boolean = false;
    
    constructor() {
        this._id = 0;
        this._username="";
        this._first_name="";
        this.last_name="";
        this._email ="";
        this._token="";
    }

    get id(): number {
        return this._id;
    }

    get username() : string{
        return this._username;
    }

    get first_name() : string{
        return this._first_name;
    }

    get last_name() : string{
        return this._last_name;
    }

    get email() : string{
        return this._email;
    }

    get token() : string{
        return this._token;
    }

    get cached(): boolean {
        return this._cached;
    }

    set id(id: number) {
        this._id=id;
    }

    set username(username: string) {
        this._username=username;
    }

    set first_name(firstname: string) {
        this._first_name=firstname;
    }

    set last_name(last_name: string) {
        this._last_name=last_name;
    }

    set email(email: string) {
        this._email=email;
    }

    set token(token: string) {
        this._token=token;
    }

    set cached (cached: boolean) {
        this._cached = cached;
    }
}

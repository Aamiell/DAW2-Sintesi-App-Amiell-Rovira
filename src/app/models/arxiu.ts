export class Arxiu {
    private _id: number;
    private _nom_original: string;
    private _nom: string;
    private _cached: boolean = false;

    constructor() {
        this._id = 0;
        this._nom_original="";
        this._nom="";
    }

    get id(): number {
        return this._id;
    }

    get nom_original(): string {
        return this._nom_original;
    }

    get nom(): string {
        return this._nom;
    }

    get cached(): boolean {
        return this._cached;
    }

    set id(id: number) {
        this._id=id;
    }

    set nom_original(nom_original: string) {
        this._nom_original=nom_original;
    }

    set nom(nom: string) {
        this._nom=nom;
    }

    set cached (cached: boolean) {
        this._cached = cached;
    }
}

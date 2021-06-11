
export class Recurs {
    private _id: number;
    private _tipus_recurs: string;
    private _titol: string;
    private _descripcio: string;
    private _explicacio: string;
    private _link: string;
    private _pissarra: string;
    private _categoria: string;
    private _propietari: string;
    private _data_creacio: string;
    private _hora_creacio: string;
    private _cached: boolean = false;

    constructor() {
        this._id = 0;
        this._tipus_recurs = "";
        this._titol = "";
        this._descripcio = "";
        this._explicacio = "";
        this._link = "";
        this._pissarra = "";
        this._categoria = "";
        this._propietari = "";
        this._data_creacio = "";
        this._hora_creacio = "";
        this._cached = false;
    }

    get id(): number {
        return this._id;
    }

    get tipus_recurs(): string {
        return this._tipus_recurs;
    }

    get titol(): string {
        return this._titol;
    }

    get descripcio(): string {
        return this._descripcio;
    }

    get explicacio(): string {
        return this._explicacio;
    }

    get link(): string {
        return this._link;
    }

    get pissarra(): string {
        return this._pissarra;
    }

    get categoria(): string {
        return this._categoria;
    }
    
    get propietari(): string {
        return this._propietari;
    }

    get data_creacio(): string {
        return this._data_creacio;
    }

    get hora_creacio(): string {
        return this._hora_creacio;
    }

    get cached(): boolean {
        return this._cached;
    }
    
    set id(id: number) {
        this._id=id;
    }

    set titol(titol: string) {
        this._titol=titol;
    }

    set tipus_recurs(tipus_recurs: string) {
        this._tipus_recurs=tipus_recurs;
    }

    set descripcio(descripcio: string) {
        this._descripcio=descripcio;
    }

    set explicacio(explicacio: string) {
        this._explicacio=explicacio;
    }

    set link(link: string) {
        this._link=link;
    }

    set pissarra(pissarra: string) {
        this._pissarra=pissarra;
    }

    set categoria(categoria: string) {
        this._categoria=categoria;
    }

    set propietari(propietari: string) {
        this._propietari=propietari;
    }

    set data_creacio(data_creacio: string) {
        this._data_creacio=data_creacio;
    }
    
    set hora_creacio(hora_creacio: string) {
        this._hora_creacio=hora_creacio;
    }
    
    set cached (cached: boolean) {
        this._cached = cached;
    }
}

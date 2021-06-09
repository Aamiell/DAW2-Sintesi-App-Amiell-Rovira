import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Arxiu } from '../models/arxiu';
import { SessionService } from './session.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArxiusService {

  private _arxius: BehaviorSubject<Arxiu[]> = new BehaviorSubject<Arxiu[]>([]);
  private _arxiu: BehaviorSubject<Arxiu> = new BehaviorSubject<Arxiu>(new Arxiu());

  constructor(private http: HttpClient, private session: SessionService) { }

  get arxius(): Observable<Arxiu[]> {
    return this._arxius.asObservable();
  }

  get arxiu(): Observable<Arxiu> {
    return this._arxiu.asObservable();
  }

  getArxiuPrincipalRecurs(idx: number) {
    var arxiu: Arxiu = new Arxiu();
    this.arxiu.pipe(take(1)).subscribe(
    );
    console.log(arxiu);
    if (arxiu.cached) {
      this._arxiu.next(arxiu);
    } else {
      if (arxiu.id != null) {
        this.http.get("http://localhost/sintesi/api_private/arxiu/recurs?id=" + idx).subscribe(
          (reponse: any) => {
            arxiu.id = reponse.id;
            arxiu.nom_original = reponse.nom_original;
            arxiu.nom = reponse.nom;
            console.log(reponse);
            console.log(arxiu);
            this._arxiu.next(arxiu);
          }
        );
      }
    }
  }

  getArxiusAdjuntsRecurs(idx: number) {
    var arxiu: Arxiu = new Arxiu();
    this.arxius.pipe(take(1)).subscribe(
    );
    console.log(arxiu);
    if (arxiu.cached) {
      this._arxius.next([]);
    } else {
      if (arxiu.id != null) {
        this.http.get("http://localhost/sintesi/api_private/adjunts/recurs?=" + idx).subscribe(
          (reponse: any) => {
            arxiu.id = reponse.id;
            arxiu.nom_original = reponse.nom_original;
            arxiu.nom = reponse.nom;

            this.arxius.pipe(take(1)).subscribe(
              (originalRecursos: Arxiu[]) => {
                this._arxius.next(originalRecursos.concat(arxiu));
              }
            )
          }
        );
      }
    }
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recurs } from '../models/recurs';
import { SessionService } from './session.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  private _recursos: BehaviorSubject<Recurs[]> = new BehaviorSubject<Recurs[]>([]);
  private _recurs: BehaviorSubject<Recurs> = new BehaviorSubject<Recurs>(new Recurs());

  constructor(private http: HttpClient, private session: SessionService) { }

  get recursos(): Observable<Recurs[]> {
    return this._recursos.asObservable();
  }

  get recurs(): Observable<Recurs> {
    return this._recurs.asObservable();
  }

  retrieveRecursosFromHttp() {
    let size = 0;
    this.recursos.pipe(take(1)).subscribe(
      (originalNews: Recurs[]) => {
        size = originalNews.length;
      }
    );

    this.http.get("http://localhost/sintesi/api_private/recursos").subscribe(
      (response: any[]) => {
        console.log(response);
        if (response.length == size) return;
        else this._recursos.next([]);

        response.forEach((element) => {
          let recurs: Recurs = new Recurs();
          recurs.id = element.id;
          recurs.titol = element.titol;
          recurs.descripcio = element.descripcio;
          recurs.explicacio = element.explicacio;
          recurs.propietari = element.propietari;
          recurs.link = element.link;

          this.recursos.pipe(take(1)).subscribe(
            (originalRecursos: Recurs[]) => {
              this._recursos.next(originalRecursos.concat(recurs));
            }
          )
        }
        )
      }
    )
  }

  deleteNewsFromHttp(id: number) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'aplication/json',
        'Authorization': "Bearer " + this.session.user.token
      }),
      observe: 'response' as 'response'
    }
    this.http.delete("http://localhost/sintesi/api_private/recurs/" + id, options).subscribe(
      (response: any) => {
        let token = response.body.token;
        this.session.updateUserToken(token);
        console.log("NOTICIA BORRADA CORRECTAMENT");
        this.retrieveRecursosFromHttp();
      },
      (error: any) => {
        console.log("ERROR:" + error);
        console.log(error);
      }
    )
  }

  getRecursFromHttp(idx: number) {
    var recurs: Recurs = new Recurs();
    this.recurs.pipe(take(1)).subscribe(
    );
    console.log(recurs);
    if (recurs.cached) {
      this._recurs.next(recurs);
    } else {
      if (recurs.id != null) {
        this.http.get("http://localhost/sintesi/api_private/recursos?id=" + idx).subscribe(
          (response: any) => {
            recurs.id = response.id;
            recurs.titol = response.titol;
            recurs.descripcio = response.slug;
            recurs.explicacio = response.explicacio;
            recurs.descripcio = response.descripcio;
            recurs.tipus_recurs = response.tipus_recurs;
            recurs.propietari = response.propietari;
            recurs.pissarra = response.pissarra;
            recurs.link = response.link;

            this.recurs.pipe(take(1)).subscribe(
              (origRecurs: Recurs) => {
                origRecurs[idx] = this.recurs;
                this._recurs.next(origRecurs);
              }
            );
            this._recurs.next(recurs);
          }
        );
      }
    }
  }

}

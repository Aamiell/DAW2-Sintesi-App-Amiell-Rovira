import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient, private router: Router) { }

  set user(user: User) {
    let infouser = {
      'id': user.id,
      'username': user.username,
      'first_name': user.first_name,
      'last_name': user.last_name,
      'email': user.email,
      'token': user.token
    }
    localStorage.setItem("INFO_USER", JSON.stringify(infouser));
  }

  get user(): User {
    let userStr = localStorage.getItem("INFO_USER");
    let user = new User();
    if (userStr != null) {
      let userObj = JSON.parse(userStr);
      user.id = userObj.id;
      user.username = userObj.username;
      user.first_name = userObj.first_name;
      user.last_name = userObj.last_name;
      user.email = userObj.email;
      user.token = userObj.token;
    }
    return user;
  }

  login(username: string, password: string) {
    let infouser = {
      user: username,
      pass: password
    }
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    }
    return this.http.post('http://localhost/sintesi/api_private/recursos/login', infouser, options);
  }

  parseJwt() {
    let info = localStorage.getItem("INFO_USER");
    let infoObj = JSON.parse(info);
    let token = infoObj.token;
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(jsonPayload);
    return JSON.parse(jsonPayload);
  };
  updateUserToken(token) {
    let infouser = {
      'token': token
    }
    localStorage.setItem("INFO_USER", JSON.stringify(infouser));
  }

  errorLogin() {
    localStorage.removeItem("INFO_USER");
  }

  logout() {
    this.router.navigate(['/home']);
    localStorage.removeItem("INFO_USER");
  }

  modifyInfoUser(id, username, nom, congnom, email) {
    let modinfouser = {
      id: id,
      username: username,
      nom: nom,
      cognom: congnom,
      email: email
    }
    console.log(modinfouser);
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':"Bearer " +this.user.token
      }),
      observe: 'response' as 'response'
    }
    this.http.put("http://localhost/sintesi/api_private/user", modinfouser , options).subscribe(
      (response: any) => {
        let token = response.body.token;
        console.log(response);
        console.log(token);
        let user = new User();
        user.id = id;
        user.username = username;
        user.first_name = nom;
        user.token = token;
        user.last_name = congnom;
        user.email = email;
        this.user = user;
        console.log("USUARI MODIFICAT CORRECTAMENT");
        this.router.navigate(['/profile']);
      },
      (error: any) => {
        console.log("ERROR:" + error);
      }
    )
  }

}

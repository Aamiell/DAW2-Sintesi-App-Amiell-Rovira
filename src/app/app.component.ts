import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public username: string = "";
  public password: string = "";
  public loginError: boolean = false;
  constructor(private session: SessionService, private router: Router) { }
  login() {
    this.session.login(this.username, this.password).subscribe(
      (response: any) => {
        console.log(response);
        console.log(response.body);
        let user: User = new User();
        user.token = response.body.token;
        console.log(user);
        this.session.user = user;
        this.loginError = false;
        this.router.navigate(['/home']);
      },
      (error: any) => {
        this.session.errorLogin();
        this.loginError = true;
      }
    )
  }
}

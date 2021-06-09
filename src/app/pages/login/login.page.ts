import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public username: string = "";
  public password: string = "";
  public loginError: boolean = false;
  constructor(private session: SessionService, private router: Router, private activateroute: ActivatedRoute) {
    this.activateroute.paramMap.subscribe(
      (params: Params) => {
        if (this.session.user.token != '') {
          this.router.navigate(['/home']);
        }
      }
    )
  }

  login() {
    this.session.login(this.username, this.password).subscribe(
      (response: any) => {
        console.log(response);
        console.log(response.body);
        let user: User = new User();
        user.token = response.body.token;
        user.id = response.body.user.id;
        user.username = response.body.user.username;
        user.first_name = response.body.user.first_name;
        user.last_name = response.body.user.last_name;
        user.email = response.body.user.email;
        this.session.user = user;
        this.loginError = false;
        this.router.navigate(['/home']);
        this.session.parseJwt();
      },
      (error: any) => {
        this.session.errorLogin();
        this.loginError = true;
      }
    )
  }
  ngOnInit() {
  }

}

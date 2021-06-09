import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private session: SessionService, private router: Router, private activateroute: ActivatedRoute) {
    this.activateroute.paramMap.subscribe(
      (params: Params) => {
        if (this.session.user.token == '') {
          this.router.navigate(['/home']);
        }
      }
    )
  }

  ngOnInit() {
  }

  logout() {
    this.session.logout();
  }

  goToHome() {
    this.router.navigate(['/home']); 
  }

}

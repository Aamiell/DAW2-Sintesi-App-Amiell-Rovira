import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public session: SessionService, private activateroute: ActivatedRoute, private router: Router) {
    this.activateroute.paramMap.subscribe(
      (params: Params) => {
        if (this.session.user.token == '') {
          this.router.navigate(['/home']);
        }
      }
    )
  }

  goToEditProfile() {
    this.router.navigate(['/profile/edit']);
  }
  ngOnInit() {
  }

}

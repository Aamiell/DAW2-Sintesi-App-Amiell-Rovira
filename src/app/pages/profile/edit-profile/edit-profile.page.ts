import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  public id: number ;
  public username: string = "";
  public nom: string = "";
  public cognom: string = "";
  public email: string = "";
  constructor(public session: SessionService, private activateroute: ActivatedRoute, private router: Router) {
    this.activateroute.paramMap.subscribe(
      (params: Params) => {
        if (this.session.user.token == '') {
          this.router.navigate(['/home']);
        } else{
          this.id = this.session.user.id;
          this.username= this.session.user.username;
          this.nom= this.session.user.first_name;
          this.cognom= this.session.user.last_name;
          this.email= this.session.user.email;
        }
      }
    )
  }

  modifyProfile() {
    this.session.modifyInfoUser(this.id, this.username, this.nom, this.cognom, this.email);
  }
  ngOnInit() {
  }

}

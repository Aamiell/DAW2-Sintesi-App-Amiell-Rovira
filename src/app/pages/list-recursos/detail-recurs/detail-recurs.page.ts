import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Arxiu } from 'src/app/models/arxiu';
import { Recurs } from 'src/app/models/recurs';
import { ArxiusService } from 'src/app/services/arxius.service';
import { RecursosService } from 'src/app/services/recursos.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-detail-recurs',
  templateUrl: './detail-recurs.page.html',
  styleUrls: ['./detail-recurs.page.scss'],
})
export class DetailRecursPage implements OnInit {

  public recurs: Recurs;
  public arxiu: Arxiu;
  private idx: number;
  constructor(private router: Router, private activateRoute: ActivatedRoute, private recursosService: RecursosService, private arxiusService: ArxiusService, private session: SessionService) {
    this.activateRoute.params.subscribe(
      (params: ParamMap) => {
        if (params['id'] == null) {
          this.router.navigate(["/home"])
        } else {
          this.idx = Number(params['id']);
          this.recursosService.getRecursFromHttp(this.idx);
          this.arxiusService.getArxiuPrincipalRecurs(this.idx);
          this.arxiusService.getArxiusAdjuntsRecurs(this.idx);
          this.recursosService.recurs.subscribe(
            (recurs: Recurs) => {
              this.recurs = recurs;
            }
          );
          this.arxiusService.arxiu.subscribe(
            (arxiu: Arxiu) => {
              this.arxiu = arxiu;
            }
          )
          
        }
      }
    );
  
  }

  ngOnInit() {
  }

}

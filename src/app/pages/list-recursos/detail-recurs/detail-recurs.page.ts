import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Arxiu } from 'src/app/models/arxiu';
import { Recurs } from 'src/app/models/recurs';
import { ArxiusService } from 'src/app/services/arxius.service';
import { RecursosService } from 'src/app/services/recursos.service';
import { SessionService } from 'src/app/services/session.service';
// declare const YoutubePlayer: any;
//declare var player: any;
//import * as YoutubePlayer from 'src/assets/js/link_youtube.js';

declare const loadYoutubePlayer: any;
declare var videoid: any;


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
        if (params['id'] == null || this.session.user.token == '') {
          this.router.navigate(["/home"])
        } else {
          this.idx = Number(params['id']);
          this.recursosService.getRecursFromHttp(this.idx);
          this.arxiusService.getArxiuPrincipalRecurs(this.idx);
          this.arxiusService.getArxiusAdjuntsRecurs(this.idx);
          this.recursosService.recurs.subscribe(
            (recurs: Recurs) => {
              console.log(recurs);
              this.recurs = recurs;
              this.recurs.link = recurs.link;
              if(this.recurs.tipus_recurs == "link_video") {
                if(document.querySelectorAll('script[src="https://www.youtube.com/iframe_api"]').length == 0) {
                  var tag = document.createElement('script');
                  
                  tag.src = "https://www.youtube.com/iframe_api";
                  var firstScriptTag = document.getElementsByTagName('script')[0];
                  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                }
                
                videoid = this.recurs.link.substring(32, 43);
                loadYoutubePlayer(videoid);
              }
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
  //   this.recursosService.recurs.subscribe(
  //     (recurs: Recurs) => {
  //       this.recurs = recurs;
  //       this.recurs.link = recurs.link;
  //       loadYoutubePlayer(this.recurs.link);
  //       // console.log(YoutubePlayer);
  //       // YoutubePlayer.player.loadVideoById("dzsuE5ugxf4");
  //     }
  //   );
  // }
  }

  getVisibility(): string {
    if(this.recurs.tipus_recurs == "link_video") {
      return 'display: block;';
    }
    else return 'display: none;';
   }
}

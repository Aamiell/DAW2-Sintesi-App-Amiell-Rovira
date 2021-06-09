import { Component, OnInit } from '@angular/core';
import { Recurs } from 'src/app/models/recurs';
import { RecursosService } from 'src/app/services/recursos.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-list-recursos',
  templateUrl: './list-recursos.page.html',
  styleUrls: ['./list-recursos.page.scss'],
})
export class ListRecursosPage implements OnInit {

  public recursos: Recurs[] = [];
  constructor(private recursosService: RecursosService, private session: SessionService) {
    this.recursosService.retrieveRecursosFromHttp();
    this.recursosService.recursos.subscribe(
      (originalRecursos: Recurs[]) => {
        this.recursos = originalRecursos;
      }
    )
  }

  ngOnInit() {
  }

  deleteRecurs(id:number) {
    this.recursosService.deleteNewsFromHttp(id);
  }

}

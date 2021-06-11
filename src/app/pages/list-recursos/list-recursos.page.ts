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

public searchrecursos: string ="";
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

  searchRecursos(recurs: Recurs) {
    if (this.searchrecursos == "") return true;
    if (recurs.titol.toUpperCase().includes(this.searchrecursos.toUpperCase())) return true;
    // if (recurs.desc.toUpperCase().includes(this.searchrecursos.toUpperCase())) return true;
    else return false;
  }

  deleteRecurs(id:number) {
    this.recursosService.deleteNewsFromHttp(id);
  }

}

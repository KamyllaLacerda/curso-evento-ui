import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Evento } from '../model/evento.model';


@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  eventoUrl = `${environment.url}/evento`
  evento: Evento

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<any[]>(this.eventoUrl);
  }

  removerEvento(id){
    return this.http.delete(`${this.eventoUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Inscricao } from '../model/inscricao.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  inscricaoUrl = 'http://localhost:8080/inscricao';
  usuariosUrl = 'http://localhost:8080/usuario';
  usuarioEvento = 'http://localhost:8080/inscricao/usuario/';
  inscricaoEvento = 'http://localhost:8080/evento/inscricao';
  

  constructor(private http: HttpClient) { }

  inscrever(inscricao: any){
    console.log(inscricao)
    return this.http.post(this.inscricaoUrl, inscricao);
  }

  listarUsuarioNaTabela(id){
    return this.http.get<any>((`${this.inscricaoEvento}/${id}`)); 
  }

  alterarStatusUsuario(inscricao : Inscricao){
  return this.http.put<any>(this.inscricaoUrl, inscricao);
}
}

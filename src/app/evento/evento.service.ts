import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Inscricao } from '../model/inscricao.model';
import { environment } from  '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  inscricaoUrl = `${environment.url}/inscricao`;
  usuariosUrl = `${environment.url}/usuario`;
  usuarioEvento = `${environment.url}/inscricao/usuario/`;
  inscricaoEvento = `${environment.url}/evento/inscricao`;
  

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

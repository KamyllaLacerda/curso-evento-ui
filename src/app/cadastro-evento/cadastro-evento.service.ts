import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from  '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CadastroEventoService {

  eventoUrl = `${environment.url}/evento`

  constructor(private http: HttpClient) { }

  cadastrar(evento: any){
    return this.http.post(this.eventoUrl, evento);
  }
}

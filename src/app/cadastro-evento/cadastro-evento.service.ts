import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CadastroEventoService {

  eventoUrl = 'http://localhost:8080/evento'

  constructor(private http: HttpClient) { }

  cadastrar(evento: any){
    return this.http.post(this.eventoUrl, evento);
  }
}

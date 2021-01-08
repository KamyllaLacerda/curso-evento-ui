import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  recuperarUsuario(username): Observable<any> {
    let token = JSON.parse(localStorage.getItem('auth')).token;
    return this.http.get<any>(`${environment.servicoSiaUrl}/users/username?value=${username}`,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token }) }
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private http: HttpClient) { }

  buscaRotasPermitidas(username, path){
    let token = JSON.parse(localStorage.getItem('auth')).token;
    return this.http.get<any>(`${environment.servicoSiaUrl}/routes/userAllowedRoutes?username=${username}&categoria=${path}`,
      {headers: new HttpHeaders({'Authorization': 'Bearer '+ token})
    });
  }

  async possuiPermissao(roles, username, route) : Promise<boolean>{
    if(route === '/'){
      return true;
    }
  let rotasPermitidas = await this.buscaRotasPermitidas(username, route).toPromise();
    let permitido = false;

    for (const role of roles) {
      rotasPermitidas.forEach(element => {
        if (element.address === role) {
          permitido = true;
          return;
        }
      });
    }
    return await permitido;
  }
}

import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CadastroEventoService } from './cadastro-evento/cadastro-evento.service';
import { Usuario } from './model/usuario.model';
import { CookieService } from './services/cookie.service';
import { environment } from 'src/environments/environment';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'evento-ui';

  constructor(
    private auth: AuthService,
    private cookieService: CookieService,
    private service: SharedService,
  ) { }

  usuario: Usuario = {
    id: 0,
    nome: "",
    sobrenome: "",
    cpf: "",
    email: "",
    inscricoes:[]
  };
  localUser;
  loggedUser;

  ngOnInit(){
        if(!this.cookieService.check() && !localStorage.getItem('auth')){
      document.location.href = `${environment.frontSiaUrl}/login?origin=` + document.location.origin + document.location.pathname;
    }
 
    this.cookieService.getCookie().then(result => {

      this.usuario.nome = result.username;
      localStorage.setItem('auth', JSON.stringify(result));
      this.buscaPermissoes(result.username);

      this.service.recuperarUsuario(this.usuario.nome).subscribe(res => {
        this.usuario.email = res.emailCoorp;
        this.usuario.nome = res.name;
        localStorage.setItem('localUser', JSON.stringify(this.usuario.nome));
      });

    });
    return;
  }

  buscaPermissoes(user) {
    let path = document.location.pathname.split('/')[1];

    if(path != ''){
      this.auth.buscaRotasPermitidas(user, path).subscribe(res => {
        localStorage.setItem('permissoes', JSON.stringify(res));
      });
    }
  }
  
}

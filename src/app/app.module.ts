import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { CadastroEventoComponent } from './cadastro-evento/cadastro-evento.component';
import { PrincipalComponent } from './principal/principal.component';
import { PrincipalService } from './principal/principal.service';
import { EventoComponent } from './evento/evento.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NgxMaskModule, IConfig } from 'ngx-mask'


const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CadastroEventoComponent,
    PrincipalComponent,
    EventoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    NgxMaskModule.forRoot(maskConfig),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    PrincipalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

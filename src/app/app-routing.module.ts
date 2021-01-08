import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroEventoComponent } from './cadastro-evento/cadastro-evento.component';
import { EventoComponent } from './evento/evento.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  { path: 'home', component: PrincipalComponent },
  { path: 'cadastrarEvento', component: CadastroEventoComponent },
  { path: 'evento', component: EventoComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { Evento } from '../model/evento.model';
import { Inscricao } from '../model/inscricao.model';
import { Usuario } from '../model/usuario.model';
import { EventoService } from './evento.service';
import * as moment from 'moment'
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  alert: Boolean = false;
  inscricoes: Array<Inscricao> = [];
  evento: Evento;
  inscricao: Inscricao = new Inscricao();
  dataAgora;
  dataFimInscricao: Inscricao;
  dataFim;
  quantidadeUsuario: number = 1;
  dataLimiteInscricao = JSON.parse(localStorage.getItem("evento")).dataFimInscricao;


  constructor(private inscricaoService: EventoService, private toastr: ToastrService) { }

  ngOnInit() {
    this.carregarDados();
    this.mostrarUsuario();

  }

  carregarDados() {
    this.evento = JSON.parse(localStorage.getItem("evento"));
    //localStorage.removeItem("evento");
  }

  criar(frm: FormControl) {
    console.log(frm.value);
    let usuario: Usuario = frm.value;
    let inscricao: Inscricao = new Inscricao();
    inscricao.dataHora = inscricao.dataHora;
    inscricao.status = inscricao.status;
    inscricao.usuario = usuario;
    inscricao.evento = this.evento;
    if (this.dataLimiteInscricao < this.dataAgora) {
      return this.toastr.error('Lamento, mas data limite para inscrição já passou. ', 'Ops!');
    }
    if (inscricao.evento.numeroVagas < this.quantidadeUsuario) {
      return this.toastr.error('Lamento, este evento não possui mais vagas', 'Ops!');
    }


    this.inscricaoService.inscrever(inscricao)
      .subscribe(() => {
        frm.reset();
        window.location.reload();
      }, (error) => { return this.toastr.error('Este CPF já foi cadastrado.', 'Ops!'); })


  }

  mostrarUsuario() {

    return this.inscricaoService.listarUsuarioNaTabela(this.evento.id).subscribe(inscricoes => {
      this.inscricoes = inscricoes

      this.inscricoes.forEach(inscricao => {
        if (inscricao.status === "Aceito") {
          this.quantidadeUsuario++;
        }

      });
      console.log(this.quantidadeUsuario);
    });

  }

  gerarCertificado(id) {
    window.open(`${'http://localhost:8080/inscricao/pdf'}/${id}`, '_blank');
  }

  gerarQrcode(id) {
    window.open(`${'http://localhost:8080/inscricao/qrcode'}/${id}`, '_blank');
  }

  verificarData() {
    this.dataFim = this.dataFimInscricao = JSON.parse(localStorage.getItem("evento")).dataFim
    this.dataAgora = moment(new Date).format("YYYY-MM-DD");
    if (this.dataFim < this.dataAgora) {
      return true;
    } else {
      return false;
    }
  }

  alterarStatusAceito(cpfUsuario) {
    let quantidadeDeVagas = JSON.parse(localStorage.getItem("evento")).numeroVagas
    if (quantidadeDeVagas < this.quantidadeUsuario) {
      return this.toastr.error('Você não pode aceitar mais inscritos, evento não possui mais vagas.', 'Ops!');
    }
    this.inscricao.usuario = new Usuario(null, null, null, cpfUsuario);
    this.inscricao.evento = new Evento(JSON.parse(localStorage.getItem("evento")).id)

    this.inscricao.status = "Aceito";
    this.inscricaoService.alterarStatusUsuario(this.inscricao).subscribe(() => {
      inscricao => this.inscricao = inscricao;
      window.location.reload();
    }

    );
  }

  alterarStatusRecusado(cpfUsuario) {
    this.inscricao.usuario = new Usuario(null, null, null, cpfUsuario);
    this.inscricao.evento = new Evento(JSON.parse(localStorage.getItem("evento")).id)
    this.inscricao.status = "Recusado"
    this.inscricaoService.alterarStatusUsuario(this.inscricao).subscribe(() => {
      inscricao => this.inscricao = inscricao;
      window.location.reload();
    }
    );
  }

  fecharAlerta() {
    this.alert = false;
  }

  resetarFormInscricao(frm: FormControl) {
    frm.reset();
  }



}
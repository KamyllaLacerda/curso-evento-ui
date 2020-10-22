import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscriber } from 'rxjs';
import { Evento } from '../model/evento.model';
import { CadastroEventoService } from './cadastro-evento.service';


@Component({
  selector: 'app-cadastro-evento',
  templateUrl: './cadastro-evento.component.html',
  styleUrls: ['./cadastro-evento.component.css']
})
export class CadastroEventoComponent implements OnInit {
  alertaDataEvento: Boolean = false;
  alertaHoraEvento: Boolean = false;
  alertaDataInscricao: Boolean = false;
  alertaDataInscricao1: Boolean = false;
  alertaDataInscricao2: Boolean = false;

  constructor(private eventoService: CadastroEventoService) { }

  ngOnInit() {
  }

  criar(frm: FormControl) {
    console.log(frm.value);
    let dataInicio = frm.value.dataInicio;
    let dataFim = frm.value.dataFim;
    let horaInicio = frm.value.horaInicio;
    let horaFim = frm.value.horaFim;
    let dataInicioInscricao = frm.value.dataInicioInscricao;
    let dataFimInscricao = frm.value.dataFimInscricao;

    if (dataFim < dataInicio) {
      this.alertaDataEvento = true;
    }
    if (dataInicio == dataFim) {
      if (horaFim <= horaInicio) {
        this.alertaHoraEvento = true;
      }
    } else
      if (dataFimInscricao < dataInicioInscricao) {
        this.alertaDataInscricao = true;
      }
    if (dataInicioInscricao > dataInicio) {
      this.alertaDataInscricao1 = true;
    }
    if (dataFimInscricao > dataFim) {
      this.alertaDataInscricao2 = true;
    }

    else if (this.alertaDataEvento == false && this.alertaHoraEvento == false &&
      this.alertaDataInscricao == false && this.alertaDataInscricao1 == false && this.alertaDataInscricao2 == false) {
      {
        this.eventoService.cadastrar(frm.value)
          .subscribe(() => {
            frm.reset();
          });
      }
    }
  }

  fecharAlertaDataEvento() {
    this.alertaDataEvento = false;
  }

  fecharAlertaHoraEvento() {
    this.alertaHoraEvento = false;
  }

  fecharAlertaDataInscricao() {
    this.alertaDataInscricao = false;
  }

  fecharAlertaDataInscricao1() {
    this.alertaDataInscricao1 = false;
  }

  fecharAlertaDataInscricao2() {
    this.alertaDataInscricao2 = false;
  }
}
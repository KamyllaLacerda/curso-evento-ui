import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CadastroEventoService } from './cadastro-evento.service';


@Component({
  selector: 'app-cadastro-evento',
  templateUrl: './cadastro-evento.component.html',
  styleUrls: ['./cadastro-evento.component.css']
})
export class CadastroEventoComponent implements OnInit {
  alert1 = false;
  alert2 = false;
  alert3 = false;
  alert4 = false;
  alert5 = false;

  constructor(private eventoService: CadastroEventoService, private toastr: ToastrService) { }

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

    
    if (dataInicio == dataFim && horaFim <= horaInicio)
      this.toastr.error('Hora de término do evento menor ou igual a hora de início do evento.', 'Ops!');

    else if (dataFim < dataInicio)
      this.toastr.error('Data de término do evento menor que a data de início.', 'Ops!');

    else if (dataFimInscricao < dataInicioInscricao) 
      this.toastr.error('Data de término das inscrições menor que a data de início das inscrições.', 'Ops!');

   else if (dataInicioInscricao > dataInicio) 
      this.toastr.error('Data de início das inscrições maior que a data de início do evento.', 'Ops!');

    else if (dataFimInscricao > dataFim) 
      this.toastr.error('Data de término das inscrições maior que a data de término do evento.', 'Ops!');
      
    else {
      {
        {
          this.eventoService.cadastrar(frm.value)
            .subscribe(() => {
              frm.reset();
              this.toastr.success('Cadastro do evento realizado com sucesso!');
            });
        }
      }
    }
  }
}


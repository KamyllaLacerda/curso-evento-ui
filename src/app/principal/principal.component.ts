import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from '../model/evento.model';

import { PrincipalService } from './principal.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EventoService } from '../evento/evento.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  eventos = [];
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModel') deleteModel;
  evento: Evento;

  constructor(private principalService: PrincipalService,
    private router: Router,
    private modalService: BsModalService,
  
  ) { }

  ngOnInit() {
    this.listar();

  }

  listar() {
    this.principalService.listar().subscribe(dados => this.eventos = dados);
  }

  mostrarDadosEvento(evento: Evento) {
    localStorage.setItem("evento", JSON.stringify(evento));
    this.router.navigate(["evento"]);
  }

  onDelete(evento) {
    this.evento = evento;
    this.deleteModalRef = this.modalService.show(this.deleteModel, { class: 'modal-sm' });
  }

  onConfirmDelete() {
    this.principalService.removerEvento(this.evento.id)
    .subscribe();
    this.deleteModalRef.hide();
    window.location.reload();
  }

  onDeclineDelete(): void {
    this.deleteModalRef.hide();
  }

}

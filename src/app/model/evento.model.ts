import { Inscricao } from './inscricao.model';

export class Evento{
     constructor(
        public id?: number,
        public titulo?: string,
        public local?: string,
        public dataInicio?: Date,
        public dataFim?: Date,
        public horaInicio?: Date,
        public horaFim?: Date,
        public descricao?: string,
        public ementa?: string,
        public numeroVagas?: number,
        public dataInicioInscricao?: Date,
        public dataFimInscricao?: Date,
        public inscricoes?: Inscricao[]
        ){}
}
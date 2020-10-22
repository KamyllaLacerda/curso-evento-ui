import { Inscricao } from './inscricao.model';

export class Usuario{
   

    constructor(
        public id?: number,
        public nome?: string,
        public sobrenome?: string,
        public cpf?: string,
        public email?: string,
        public inscricoes?: Inscricao[]
        ){}
}
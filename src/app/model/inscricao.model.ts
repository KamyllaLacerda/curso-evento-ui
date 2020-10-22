
import { Evento } from './evento.model';
import { Usuario } from './usuario.model';

export class Inscricao{
    constructor(
    public id?: number,
    public dataHora?: Date,
    public status?: String,
    public usuario?: Usuario,
    public evento?: Evento
    ){}
}
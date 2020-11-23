
export class Estabelecimento {
  codigo: number;
  endereco: string;
  nome: string;
  telefone: string;
  profissionais: Profissional[];
}

export class Profissional {
  codigo: number;
  nome: string;
  telefoneCelular: string;
  telefoneResidencial: string;
  funcao: string;
  endereco: string;
}

export class Ocupacao {
  codigo: number;
  codigoEstabelecimento: any;
  codigoProfissional: any;
}

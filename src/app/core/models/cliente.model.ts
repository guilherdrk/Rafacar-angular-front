export interface ClienteDTO {
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  endereco: string;
}

export interface ClienteSummaryDTO extends ClienteDTO{
  id: number;
}

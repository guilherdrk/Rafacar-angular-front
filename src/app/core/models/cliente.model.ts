export interface ClienteDTO {
  nomeCompleto: string;
  cpf: string;
}

export interface ClienteSummaryDTO extends ClienteDTO{
  id: number;
}

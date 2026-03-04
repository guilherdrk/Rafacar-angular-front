
export type StatusVeiculo = 'DISPONIVEL' | 'ALUGADO' | 'MANUTENCAO';

export interface VeiculoSummaryDTO {
  id: number;
  modelo: string;
  marca: string;
  placa: string;
  status: StatusVeiculo;
  precoDiariaPadrao: number
}

export interface CreateVeiculoDTO {
  modelo: string;
  marca: string;
  placa: string;
  precoDiariaPadrao: string;
}

export interface ManutencaoDTO {
  descricao: string;
  custo: string;
}

export interface ClienteDTO {
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  endereco: string;
}

export interface ClienteSummaryDTO extends ClienteDTO{
  id: number;
}


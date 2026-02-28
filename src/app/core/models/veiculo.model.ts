
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

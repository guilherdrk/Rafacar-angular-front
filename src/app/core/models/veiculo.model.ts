
export type StatusVeiculo = 'DISPONIVEL' | 'ALUGADO' | 'MANUTENCAO';

export interface VeiculoSummaryDTO {
  id: number;
  modelo: string;
  marca: string;
  placa: string;
  status: StatusVeiculo;
  precoDiariaPadrao: number
}

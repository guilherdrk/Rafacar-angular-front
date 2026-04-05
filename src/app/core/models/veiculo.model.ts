export type StatusVeiculo = 'DISPONIVEL' | 'ALUGADO' | 'MANUTENCAO';

export interface VeiculoSummaryDTO {
  id: number;
  modelo: string;
  marca: string;
  placa: string | null;
  status: StatusVeiculo;
  precoDiariaPadrao: number
}

export interface CreateVeiculoDTO {
  modelo: string;
  marca: string;
  placa: string | null;
  precoDiariaPadrao: string;
}

export interface ManutencaoDTO {
  descricao: string;
  custo: string;
  dataManutencao?: string | null;
}

export interface UpdateVeiculoDTO{
  modelo: string,
  marca: string,
  placa: string | null,
  precoDiariaPadrao: string
}

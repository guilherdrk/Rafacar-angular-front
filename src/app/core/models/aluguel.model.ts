import { NivelCombustivel } from "./enums";

export interface AluguelRequestDTO {
  veiculoId: number;
  dataRetirada?: string;
  dataDevolucaoPrevista: string;
  combustivelRetirada: NivelCombustivel;
  precoDiariaCustomizada?: string;
  clienteId: number;
}

export interface AluguelResponseDTO {
  id: number;
  veiculoId: number;
  veiculoModelo: string;
  clienteId: number;
  clienteNome: string;
  dataRetirada: string;
  dataDevolucaoPrevista: string;
  valorDiaria: string;
  nivelCombustivelRetirada: NivelCombustivel;
}

export interface AluguelDevolucaoDTO {
  combustivelDevolucao: NivelCombustivel;
  dataDevolucaoReal?: string;
  quantidadeDias?: number;
}

export interface AluguelCompletoResponseDTO {
  id: number;
  cliente: number;
  veiculo: number;
  dataRetirada: string;
  dataDevolucaoReal: string;
  combustivelRetirada: NivelCombustivel;
  combustivelDevolucao: NivelCombustivel;
  quantidadeDias?: number;
  valorDiariaAcordado: string;
  valorTotal: string;
}

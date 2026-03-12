import { NivelCombustivel } from "./enums";


export interface AluguelRequestDTO {
  veiculoId: number;
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
}

export interface AluguelCompletoResponseDTO {
  id: number;
  cliente: number;
  veiculo: number;
  dataRetirada: string;
  dataDevolucaoReal: string;
  combustivelRetirada: NivelCombustivel;
  combustivelDevolucao: NivelCombustivel;
  valorDiariaAcordado: string;
  valorTotal: string;
}

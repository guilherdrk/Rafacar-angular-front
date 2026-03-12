export interface AluguelListItemDTO {
  id: number;
  clienteId: number;
  clienteNome: string;
  veiculoId: number;
  veiculoModelo: string;
  veiculoPlaca: string;
  dataRetirada: string;
  dataDevolucaoPrevista: string;
  dataDevolucaoReal: string | null;
  valorDiariaAcordado: string;
  valorTotal: string | null;
}


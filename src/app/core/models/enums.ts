export type NivelCombustivel = 'CHEIO' | 'TRES_QUARTOS' | 'MEIO_TANQUE' | 'UM_QUARTO' | 'RESERVA';

export const NIVEL_COMBUSTIVEL_OPCOES: { value: NivelCombustivel; label: string }[] = [
  { value: 'CHEIO', label: 'Cheio' },
  { value: 'TRES_QUARTOS', label: '3/4' },
  { value: 'MEIO_TANQUE', label: 'Meio tanque' },
  { value: 'UM_QUARTO', label: '1/4' },
  { value: 'RESERVA', label: 'Reserva'},
];


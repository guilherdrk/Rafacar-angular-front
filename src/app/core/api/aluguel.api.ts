
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  AluguelRequestDTO,
  AluguelResponseDTO,
  AluguelDevolucaoDTO,
  AluguelCompletoResponseDTO
} from '../models/aluguel.model';

@Injectable({ providedIn: 'root' })
export class AluguelApi {
  private base = `${environment.apiUrl}/alugueis`;
  constructor(private http: HttpClient) {}

  criar(dto: AluguelRequestDTO) {
    return this.http.post<AluguelResponseDTO>(this.base, dto);
  }

  devolver(id: number, dto: AluguelDevolucaoDTO) {
    return this.http.put<AluguelCompletoResponseDTO>(`${this.base}/${id}/devolucao`, dto);
  }
}

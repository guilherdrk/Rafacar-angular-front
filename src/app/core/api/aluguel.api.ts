
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  AluguelRequestDTO,
  AluguelResponseDTO,
  AluguelDevolucaoDTO,
  AluguelCompletoResponseDTO
} from '../models/aluguel.model';
import { PageResponse } from '../models/page.model';
import { AluguelListItemDTO } from '../models/aluguel-list-item.model';

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

  listar(params: { devolvido?: boolean; page: number; size: number }){
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('size', params.size);

    if(params.devolvido !== undefined){
      httpParams = httpParams.set('devolvido', params.devolvido);
    }

    return this.http.get<PageResponse<AluguelListItemDTO>>(`${this.base}`, { params: httpParams })
  }

}

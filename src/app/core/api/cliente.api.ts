import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ClienteDTO, ClienteSummaryDTO } from "../models/cliente.model";
import { PageResponse } from "../models/page.model";

@Injectable({ providedIn: 'root'})
export class ClienteApi{
  private base = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ){}

  listNormal(){
    return this.http.get<ClienteSummaryDTO[]>(`${this.base}/clientes/listNormal`);
  }

  listPaged(params: { page: number; size: number}){
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('size', params.size)

      return this.http.get<PageResponse<ClienteSummaryDTO>>(`${this.base}/clientes`, { params: httpParams });
  }

  create(dto: ClienteDTO){
    return this.http.post<ClienteDTO>(`${this.base}/clientes`, dto)
  }

  update(id: number, dto: ClienteDTO){
    return this.http.put<ClienteDTO>(`${this.base}/clientes/${id}`, dto)
  }

}

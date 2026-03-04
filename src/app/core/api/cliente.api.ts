import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ClienteDTO, ClienteSummaryDTO } from "../models/cliente.model";

@Injectable({ providedIn: 'root'})
export class ClienteApi{
  private base = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ){}

  list(){
    return this.http.get<ClienteSummaryDTO[]>(`${this.base}/clientes`)
  }

  create(dto: ClienteDTO){
    return this.http.post<ClienteDTO>(`${this.base}/clientes`, dto)
  }

  update(id: number, dto: ClienteDTO){
    return this.http.put<ClienteDTO>(`${this.base}/clientes/${id}`, dto)
  }

}

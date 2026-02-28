import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { CreateVeiculoDTO, VeiculoSummaryDTO } from "../models/veiculo.model";


@Injectable({ providedIn: 'root'})
export class VeiculoApi{
  private base = `${environment.apiUrl}`;
  constructor(
    private http: HttpClient
  ){}

  list(){
    return this.http.get<VeiculoSummaryDTO[]>(`${this.base}/veiculos`);
  }

  create(dto: CreateVeiculoDTO) {
    return this.http.post<void>(`${this.base}/veiculos`, dto);
  }

}

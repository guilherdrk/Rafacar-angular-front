import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class FinanceiroApi {
  constructor(private http: HttpClient) {}

  lucro(mes: number, ano: number) {
    return this.http.get<string>(`${environment.apiUrl}/financeiro/lucro`, {
      params: { mes, ano },
    });
  }
}

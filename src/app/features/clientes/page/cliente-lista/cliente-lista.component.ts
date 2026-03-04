import { ClienteApi } from 'src/app/core/api/cliente.api';
import { ClienteSummaryDTO } from './../../../../core/models/veiculo.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss']
})
export class ClienteListaComponent implements OnInit {
  loading: boolean = false;
  data: ClienteSummaryDTO[] = []
  displayedColumns = ['id', 'nomeCompleto', 'cpf', 'telefone', 'endereco'];


  constructor(
    private api: ClienteApi
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.loading = true;
    this.api.list().subscribe({
      next: (res) => (this.data = res),
      error: () => {},
      complete: () => (this.loading = false),
    });
  }


}

import { Component, OnInit } from '@angular/core';
import { VeiculoApi } from 'src/app/core/api/veiculo.api';
import { VeiculoSummaryDTO } from 'src/app/core/models/veiculo.model';

@Component({
  selector: 'app-veiculo-lista',
  templateUrl: './veiculo-lista.component.html',
  styleUrls: ['./veiculo-lista.component.scss']
})
export class VeiculoListaComponent implements OnInit {
  loading: boolean = false;
  data: VeiculoSummaryDTO[] = [];
  displayedColumns = ['id', 'modelo', 'marca', 'placa', 'status', 'preco']

  constructor(private api: VeiculoApi) { }

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

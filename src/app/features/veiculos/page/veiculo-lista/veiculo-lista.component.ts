import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VeiculoApi } from 'src/app/core/api/veiculo.api';
import { VeiculoSummaryDTO } from 'src/app/core/models/veiculo.model';
import { VeiculoCreateDialogComponent } from '../../components/veiculo-create-dialog/veiculo-create-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-veiculo-lista',
  templateUrl: './veiculo-lista.component.html',
  styleUrls: ['./veiculo-lista.component.scss']
})
export class VeiculoListaComponent implements OnInit {
  loading: boolean = false;
  data: VeiculoSummaryDTO[] = [];
  displayedColumns = ['id', 'modelo', 'marca', 'placa', 'status', 'preco']

  constructor(
    private api: VeiculoApi,
    private dialog: MatDialog,
    private toastr: ToastrService
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
  abrirCadastro() {
    this.dialog.open(VeiculoCreateDialogComponent, { width: '520px' })
      .afterClosed()
      .subscribe((ok: boolean) => {
        if (ok) {
          this.toastr.success('Veículo cadastrado com sucesso!');
          this.load();
        }
      });
  }

}

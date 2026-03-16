import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VeiculoApi } from 'src/app/core/api/veiculo.api';
import { VeiculoSummaryDTO } from 'src/app/core/models/veiculo.model';
import { VeiculoCreateDialogComponent } from '../../components/veiculo-create-dialog/veiculo-create-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { VeiculoManuntencaoDialogComponent } from '../../components/veiculo-manuntencao-dialog/veiculo-manuntencao-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-veiculo-lista',
  templateUrl: './veiculo-lista.component.html',
  styleUrls: ['./veiculo-lista.component.scss']
})
export class VeiculoListaComponent implements OnInit {
  loading: boolean = false;
  data: VeiculoSummaryDTO[] = [];
  displayedColumns = ['id', 'modelo', 'marca', 'placa', 'status', 'preco', 'acoes']

  constructor(
    private api: VeiculoApi,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
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

  abrirManutencao(v: VeiculoSummaryDTO){
    this.dialog.open(VeiculoManuntencaoDialogComponent, {
      width: '520px',
      data: { veiculoId: v.id, placa: v.placa},
    }).afterClosed().subscribe((ok: boolean) => {
      if(ok) {
        this.toastr.success('Veiculo enviado para manutenção!');
        this.load();
      }
    });
  }

  liberar(v: VeiculoSummaryDTO){
    this.api.liberar(v.id).subscribe({
      next: () => {
        this.toastr.success('Veiculo liberado da manutenção!');
        this.load();
      }
    });
  }

  podeEnviarManutencao(v: VeiculoSummaryDTO) {
  return v.status === 'DISPONIVEL';
  }

  podeLiberar(v: VeiculoSummaryDTO){
    return v.status === 'MANUTENCAO';
  }

  go(path: string) {
    this.router.navigateByUrl(path);
  }



}

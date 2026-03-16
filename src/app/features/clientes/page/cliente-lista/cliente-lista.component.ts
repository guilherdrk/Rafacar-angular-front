import { ClienteApi } from 'src/app/core/api/cliente.api';
import { ClienteSummaryDTO } from './../../../../core/models/cliente.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClienteFormDialogComponent } from '../../components/cliente-form-dialog/cliente-form-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss']
})
export class ClienteListaComponent implements OnInit {
  loading: boolean = false;
  data: ClienteSummaryDTO[] = []
  displayedColumns = ['id', 'nomeCompleto', 'cpf', 'telefone', 'endereco', 'acoes'];


  constructor(
    private api: ClienteApi,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.api.list().subscribe({
      next: (res) => (this.data = res),
      error: () => { },
      complete: () => (this.loading = false),
    });
  }

  abrirCadastro() {
    this.dialog.open(ClienteFormDialogComponent, { width: '520px' })
      .afterClosed()
      .subscribe((ok: boolean) => {
        if (ok) {
          this.toastr.success('Cliente cadastrado com sucesso!');
          this.load();
        }
      });
  }

  abrirEdicao(c: ClienteSummaryDTO) {
    this.dialog.open(ClienteFormDialogComponent, { width: '520px', data: { cliente: c } })
      .afterClosed()
      .subscribe((ok: boolean) => {
        if (ok) {
          this.toastr.success('Cliente atualizado com sucesso!');
          this.load();
        }
      });
  }

  go(path: string) {
    this.router.navigateByUrl(path);
  }
}

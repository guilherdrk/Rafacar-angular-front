import { ClienteApi } from 'src/app/core/api/cliente.api';
import { ClienteSummaryDTO } from './../../../../core/models/cliente.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClienteFormDialogComponent } from '../../components/cliente-form-dialog/cliente-form-dialog.component';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss']
})
export class ClienteListaComponent implements OnInit {
  loading: boolean = false;

  displayedColumns = ['id', 'nomeCompleto', 'cpf', 'acoes'];
  data: ClienteSummaryDTO[] = []
  total = 0;
  page = 0;
  size = 0;

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
    this.api.listPaged({ page: this.page, size: this.size }).subscribe({
      next: (res) => {
        this.data = res.content;
        this.total = res.totalElements;
        this.page = res.number;
        this.size = res.size;
      },
      error: () => { },
      complete: () => (this.loading = false),
    });
  }

  onPage(e: PageEvent){
    this.page = e.pageIndex;
    this.size = e.pageSize;
    this.load();
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

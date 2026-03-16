import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AluguelApi } from 'src/app/core/api/aluguel.api';
import { AluguelListItemDTO } from 'src/app/core/models/aluguel-list-item.model';
import { parseLocalDateTime } from 'src/app/core/utils/datetime-view';
import { MaterialModule } from "src/app/shared/material.module";

@Component({
  selector: 'app-aluguel-lista',
  templateUrl: './aluguel-lista.component.html',
  styleUrls: ['./aluguel-lista.component.scss'],
})
export class AluguelListaComponent implements OnInit {
  tabIndex: number = 0;
  loading: boolean = false;

  displayedColumns = ['id', 'status', 'cliente', 'veiculo', 'retirada', 'prevista', 'real', 'diaria', 'total', 'acoes'];

  data: AluguelListItemDTO[] = [];
  total = 0;
  page = 0;
  size = 10;

  constructor(private api: AluguelApi, private router: Router) { }

  ngOnInit(): void {
    this.load();
  }

  get devolvido(): boolean {
    return this.tabIndex === 1;
  }

  formatar(dt?: string | null): Date | null {
    return parseLocalDateTime(dt ?? undefined);
  }

  load() {
    this.loading = true;
    this.api.listar({ devolvido: this.devolvido, page: this.page, size: this.size }).subscribe({
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

  onTabChange(index: number) {
    this.tabIndex = index;
    this.page = 0;
    this.load();
  }

  onPage(e: PageEvent) {
    this.page = e.pageIndex;
    this.size = e.pageSize;
    this.load();
  }

  irParaNovo() {
    this.router.navigate(['/alugueis/novo']);
  }

  irParaDevolucao(id: number) {
    this.router.navigate(['/alugueis/devolucao'], { queryParams: { id } });
  }

  status(item: AluguelListItemDTO) {
    return item.dataDevolucaoReal ? 'DEVOLVIDO' : 'ABERTO';
  }

  estaAtrasado(a: AluguelListItemDTO): boolean {
    if (a.dataDevolucaoReal) return false;
    const prevista = this.formatar(a.dataDevolucaoPrevista);
    if (!prevista) return false;
    return prevista.getTime() < Date.now();
  }

  textoStatus(a: AluguelListItemDTO): string {
    if (a.dataDevolucaoReal) return 'DEVOLVIDO';
    return this.estaAtrasado(a) ? 'ATRASADO' : 'ABERTO';
  }
  
  go(path: string) {
    this.router.navigateByUrl(path);
  }

}

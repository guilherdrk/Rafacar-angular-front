import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { FinanceiroApi } from 'src/app/core/api/financeiro.api';


type LinhaHistorico = {
  mes: number;
  ano: number;
  label: string,
  lucro: string
}

@Component({
  selector: 'app-financeiro-dashboard',
  templateUrl: './financeiro-dashboard.component.html',
  styleUrls: ['./financeiro-dashboard.component.scss']
})
export class FinanceiroDashboardComponent implements OnInit {

  loading: boolean = false;

  displayedColumns = ['periodo', 'lucro'];
  historico: LinhaHistorico[] = [];

  meses = [
    { value: 1, label: 'Jan' }, { value: 2, label: 'Fev' }, { value: 3, label: 'Mar' },
    { value: 4, label: 'Abr' }, { value: 5, label: 'Mai' }, { value: 6, label: 'Jun' },
    { value: 7, label: 'Jul' }, { value: 8, label: 'Ago' }, { value: 9, label: 'Set' },
    { value: 10, label: 'Out' }, { value: 11, label: 'Nov' }, { value: 12, label: 'Dez' },
  ];

  form = this.fb.group({
    mes: [null as any, Validators.required],
    ano: [null as any, Validators.required],
    qtdMeses: [6, [Validators.required]],
  });

  // resultado do mês selecionado
  lucroSelecionado?: string;

  constructor(private fb: FormBuilder, private api: FinanceiroApi) { }

  ngOnInit(): void {
    const now = new Date();

    this.form.patchValue({
      mes: now.getMonth() + 1,
      ano: now.getFullYear(),
      qtdMeses: 6,
    });

    this.carregarTudo();
  }

  carregarTudo() {
    const mes = Number(this.form.value.mes);
    const ano = Number(this.form.value.ano);
    const qtd = Number(this.form.value.qtdMeses);

    if (!mes || !ano || !qtd) return;

    this.loading = true;

    // 1) lucro do mês selecionado
    const reqLucroSelecionado = this.api.lucro(mes, ano);

    // 2) histórico últimos N meses (inclui o mês selecionado)
    const periodos = this.ultimosMeses(ano, mes, qtd);
    const reqs = periodos.map(p => this.api.lucro(p.mes, p.ano));

    forkJoin([reqLucroSelecionado, forkJoin(reqs)]).subscribe({
      next: ([lucroAtual, lucrosHist]) => {
        this.lucroSelecionado = lucroAtual;

        this.historico = periodos.map((p, idx) => ({
          ...p,
          lucro: lucrosHist[idx],
        }));
      },
      error: () => { },
      complete: () => (this.loading = false),
    });
  }

  private ultimosMeses(ano: number, mes: number, qtd: number) {
    const out: { mes: number; ano: number; label: string }[] = [];

    let a = ano;
    let m = mes;

    for (let i = 0; i < qtd; i++) {
      out.push({
        mes: m,
        ano: a,
        label: `${this.mesLabel(m)}/${a}`,
      });

      m -= 1;
      if (m === 0) {
        m = 12;
        a -= 1;
      }
    }

    return out;
  }

  private mesLabel(mes: number) {
    return this.meses.find(x => x.value === mes)?.label ?? String(mes);
  }
}

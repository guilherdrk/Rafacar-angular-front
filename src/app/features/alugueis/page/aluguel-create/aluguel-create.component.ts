import { NIVEL_COMBUSTIVEL_OPCOES, NivelCombustivel } from './../../../../core/models/enums';
import { AluguelApi } from './../../../../core/api/aluguel.api';
import { VeiculoApi } from './../../../../core/api/veiculo.api';
import { ClienteApi } from 'src/app/core/api/cliente.api';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClienteSummaryDTO } from 'src/app/core/models/cliente.model';
import { VeiculoSummaryDTO } from 'src/app/core/models/veiculo.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { toLocalDateTime } from 'src/app/core/utils/datetime';
import { AluguelResponseDTO } from 'src/app/core/models/aluguel.model';
import { parseLocalDateTime } from 'src/app/core/utils/datetime-view';

@Component({
  selector: 'app-aluguel-create',
  templateUrl: './aluguel-create.component.html',
  styleUrls: ['./aluguel-create.component.scss']
})
export class AluguelCreateComponent implements OnInit {
  loading: boolean = false;
  saving: boolean = false;

  clientes: ClienteSummaryDTO[] = [];
  veiculosDisponiveis: VeiculoSummaryDTO[] = [];

  combustiveis = NIVEL_COMBUSTIVEL_OPCOES;

  form = this.fb.group({
    clienteId: [null as any, Validators.required],
    veiculoId: [null as any, Validators.required],
    devolucaoData: [null as any, Validators.required], // Date
    devolucaoHora: ['12:00', Validators.required],     // "HH:mm"
    combustivelRetirada: [null as any, Validators.required],
    precoDiariaCustomizada: [''],
  });

  ultimo?: AluguelResponseDTO;

  constructor(
    private fb: FormBuilder,
    private clienteApi: ClienteApi,
    private veiculoApi: VeiculoApi,
    private aluguelApi: AluguelApi,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadRefs();
  }

  loadRefs() {
    this.loading = true;

    this.clienteApi.listNormal().subscribe({
      next: (c) => (this.clientes = c),
    });


    this.veiculoApi.list().subscribe({
      next: (v) => (this.veiculosDisponiveis = v.filter(x => x.status === "DISPONIVEL")),
      complete: () => (this.loading = false),
    });
  }

  private buildDateTime(): string {
    const date: Date = this.form.value.devolucaoData!;
    const hora: string = this.form.value.devolucaoHora!;
    const [hh, mm] = hora.split(':').map(Number);

    const dt = new Date(date);
    dt.setHours(hh, mm, 0, 0);

    return toLocalDateTime(dt);
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;

    const dto = {
      clienteId: this.form.value.clienteId!,
      veiculoId: this.form.value.veiculoId!,
      dataDevolucaoPrevista: this.buildDateTime(),
      combustivelRetirada: this.form.value.combustivelRetirada!,
      precoDiariaCustomizada: this.form.value.precoDiariaCustomizada
        ? String(this.form.value.precoDiariaCustomizada).replace(',', '.')
        : undefined,
    };

    this.aluguelApi.criar(dto).subscribe({
      next: (res) => {
        this.ultimo = res;
        this.toastr.success(`Aluguel #${res.id} criado com sucesso!`);
        // this.router.navigate(['/alugueis/devolucao'], { queryParams: { id: res.id } });
      },
      error: () => (this.saving = false),
      complete: () => (this.saving = false),
    });
  }

  irParaDevolucao() {
    if (!this.ultimo) {
      return;
    }
    this.router.navigate(['/alugueis/devolucao', { queryParams: { id: this.ultimo.id } }])
  }

  formatar(dt?: string): Date | null {
    return parseLocalDateTime(dt);
  }

  go(path: string) {
    this.router.navigateByUrl(path);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AluguelApi } from 'src/app/core/api/aluguel.api';
import { AluguelCompletoResponseDTO, AluguelDevolucaoDTO } from 'src/app/core/models/aluguel.model';
import { NIVEL_COMBUSTIVEL_OPCOES } from 'src/app/core/models/enums';
import { toLocalDateTime } from 'src/app/core/utils/datetime';
import { parseLocalDateTime } from 'src/app/core/utils/datetime-view';

@Component({
  selector: 'app-aluguel-devolucao',
  templateUrl: './aluguel-devolucao.component.html',
  styleUrls: ['./aluguel-devolucao.component.scss']
})
export class AluguelDevolucaoComponent implements OnInit {

  saving: boolean = false;
  combustiveis = NIVEL_COMBUSTIVEL_OPCOES;

  resultado?: AluguelCompletoResponseDTO;

  form = this.fb.group({
    aluguelId: [null as any, Validators.required],
    combustivelDevolucao: [null as any, Validators.required],
    devolucaoData: [null as any],
    devolucaoHora: [''],
    quantidadeDias: [null as any],
  });

  constructor(
    private fb: FormBuilder,
    private api: AluguelApi,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.form.patchValue({ aluguelId: Number(id) });
    };
  }

  private buildDevolucaoDateTime(): string | undefined {
    const date = this.form.value.devolucaoData;
    const hora = this.form.value.devolucaoHora;

    if (!date) {
      return undefined;
    }

    const [hh, mm] = (hora || '12:00').split(':').map(Number);
    const dt = new Date(date);
    dt.setHours(hh, mm, 0, 0);

    return toLocalDateTime(dt);
  }
  private buildQuantidadeDias(): number | undefined {
    const valor = this.form.value.quantidadeDias;

    if (valor === null || valor === undefined || valor === '') {
      return undefined;
    }

    const numero = Number(valor);
    return Number.isFinite(numero) && numero > 0 ? numero : undefined;
  }


  devolver() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }
    this.saving = true;

    const id = Number(this.form.value.aluguelId);
    const dto: AluguelDevolucaoDTO = {
      combustivelDevolucao: this.form.value.combustivelDevolucao!,
      dataDevolucaoReal: this.buildDevolucaoDateTime(),
      quantidadeDias: this.buildQuantidadeDias(),
    };

    this.api.devolver(id, dto).subscribe({
      next: (res?) => {
        this.resultado = res;
        this.toastr.success(`Devolução concluida! Total: R$ ${res?.valorTotal}`);
      },
      error: () => (this.saving = false),
      complete: () => (this.saving = false),
    });
  }
  voltar() {
    this.router.navigate(['/alugueis/novo'])
  }

  formatar(dt?: string): Date | null {
    return parseLocalDateTime(dt);
  }

  go(path: string) {
    this.router.navigateByUrl(path);
  }



}

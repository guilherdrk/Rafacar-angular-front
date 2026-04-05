import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VeiculoApi } from 'src/app/core/api/veiculo.api';
import { VeiculoSummaryDTO } from 'src/app/core/models/veiculo.model';

type DialogData = { veiculo?: VeiculoSummaryDTO }

@Component({
  selector: 'app-veiculo-create-dialog',
  templateUrl: './veiculo-create-dialog.component.html',
})

export class VeiculoCreateDialogComponent {
  saving: boolean = false;

  form = this.fb.group({
    modelo: ['', Validators.required],
    marca: ['', Validators.required],
    placa: [''],
    precoDiariaPadrao: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private api: VeiculoApi,
    private dialogRef: MatDialogRef<VeiculoCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    if(data?.veiculo){
      this.form.patchValue({
        modelo: data.veiculo.modelo,
        marca: data.veiculo.marca,
        placa: data.veiculo.placa ?? '',
        precoDiariaPadrao: String(data.veiculo.precoDiariaPadrao),
      });
    }
  }

  get editando(){
    return !!this.data?.veiculo?.id;
  }

  cancel() {
    this.dialogRef.close(false);
  }

  private normalizarPlaca(valor: string | null | undefined): string | null {
    const placa = String(valor ?? '').trim().toUpperCase();
    return placa ? placa : null;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;

    const dto = {
      modelo: this.form.value.modelo!,
      marca: this.form.value.marca!,
      placa: this.normalizarPlaca(this.form.value.placa),
      precoDiariaPadrao: String(this.form.value.precoDiariaPadrao ?? '').replace(',', '.'),
    };

    const req$ = this.editando ? this.api.update(this.data.veiculo!.id, dto) : this.api.create(dto);
    req$.subscribe({
      next: () => this.dialogRef.close(true),
      error: () => (this.saving = false),
      complete: () => (this.saving = false),
    });
  }
}

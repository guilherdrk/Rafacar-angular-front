import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { VeiculoApi } from 'src/app/core/api/veiculo.api';

@Component({
  selector: 'app-veiculo-create-dialog',
  templateUrl: './veiculo-create-dialog.component.html',
})
export class VeiculoCreateDialogComponent {
  saving: boolean = false;

  form = this.fb.group({
    modelo: ['', Validators.required],
    marca: ['', Validators.required],
    placa: ['', Validators.required],
    precoDiariaPadrao: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private api: VeiculoApi,
    private dialogRef: MatDialogRef<VeiculoCreateDialogComponent>
  ) {}

  cancel() {
    this.dialogRef.close(false);
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
      placa: this.form.value.placa!,
      precoDiariaPadrao: String(this.form.value.precoDiariaPadrao ?? '').replace(',', '.'),
    };

    this.api.create(dto).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => (this.saving = false),
      complete: () => (this.saving = false),
    });
  }

}

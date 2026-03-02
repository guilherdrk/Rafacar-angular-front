import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VeiculoApi } from 'src/app/core/api/veiculo.api';

@Component({
  selector: 'app-veiculo-manuntencao-dialog',
  templateUrl: './veiculo-manuntencao-dialog.component.html',
  styleUrls: ['./veiculo-manuntencao-dialog.component.scss']
})
export class VeiculoManuntencaoDialogComponent {

  saving: boolean = false;

  form = this.fb.group({
    descricao: ['', [Validators.required, Validators.minLength(3)]],
    custo: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private api: VeiculoApi,
    private dialoRef: MatDialogRef<VeiculoManuntencaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { veiculoId: number; placa: string }
  ) { }

  cancel(){
    this.dialoRef.close(false);
  }

  save(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;

    const dto = {
      descricao: this.form.value.descricao!,
      custo: String(this.form.value.custo ?? '').replace('', ''),
    };

    this.api.manutencao(this.data.veiculoId, dto).subscribe({
      next: () => this.dialoRef.close(true),
      error: () => (this.saving = false),
      complete: () => (this.saving = false)
    });
  }

}

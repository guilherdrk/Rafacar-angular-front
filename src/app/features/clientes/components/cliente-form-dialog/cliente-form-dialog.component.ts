import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteApi } from 'src/app/core/api/cliente.api';
import { ClienteDTO, ClienteSummaryDTO } from 'src/app/core/models/cliente.model';

type DialogData = { cliente?: ClienteSummaryDTO };

@Component({
  selector: 'app-cliente-form-dialog',
  templateUrl: './cliente-form-dialog.component.html',
  styleUrls: ['./cliente-form-dialog.component.scss']
})
export class ClienteFormDialogComponent{

  saving: boolean = false;

  form = this.fb.group({
    nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    telefone: ['', [Validators.required, Validators.minLength(8)]],
    endereco: ['', [Validators.required, Validators.minLength(3)]],
  });

   get editando() {
    return !!this.data?.cliente?.id;
  }

  constructor(
    private fb: FormBuilder,
    private api: ClienteApi,
    private dialogRef: MatDialogRef<ClienteFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ){
    if (data?.cliente) {
      this.form.patchValue({
        nomeCompleto: data.cliente.nomeCompleto,
        cpf: data.cliente.cpf,
        telefone: data.cliente.telefone,
        endereco: data.cliente.endereco,
      });
    }
  }


  cancel() {
    this.dialogRef.close(false);
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const dto = this.form.value as ClienteDTO;

    const req$ = this.editando
      ? this.api.update(this.data.cliente!.id, dto)
      : this.api.create(dto);

    req$.subscribe({
      next: () => this.dialogRef.close(true),
      error: () => (this.saving = false),
      complete: () => (this.saving = false),
    });
  }

}

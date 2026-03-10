import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteFormDialogComponent } from './cliente-form-dialog.component';

describe('ClienteFormDialogComponent', () => {
  let component: ClienteFormDialogComponent;
  let fixture: ComponentFixture<ClienteFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

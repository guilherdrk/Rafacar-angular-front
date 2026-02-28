import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoCreateDialogComponent } from './veiculo-create-dialog.component';

describe('VeiculoCreateDialogComponent', () => {
  let component: VeiculoCreateDialogComponent;
  let fixture: ComponentFixture<VeiculoCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiculoCreateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiculoCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

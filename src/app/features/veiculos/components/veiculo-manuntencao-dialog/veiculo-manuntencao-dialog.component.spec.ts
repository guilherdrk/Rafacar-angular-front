import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoManuntencaoDialogComponent } from './veiculo-manuntencao-dialog.component';

describe('VeiculoManuntencaoDialogComponent', () => {
  let component: VeiculoManuntencaoDialogComponent;
  let fixture: ComponentFixture<VeiculoManuntencaoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiculoManuntencaoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiculoManuntencaoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

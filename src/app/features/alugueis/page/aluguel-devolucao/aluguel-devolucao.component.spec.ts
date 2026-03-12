import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AluguelDevolucaoComponent } from './aluguel-devolucao.component';

describe('AluguelDevolucaoComponent', () => {
  let component: AluguelDevolucaoComponent;
  let fixture: ComponentFixture<AluguelDevolucaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AluguelDevolucaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AluguelDevolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

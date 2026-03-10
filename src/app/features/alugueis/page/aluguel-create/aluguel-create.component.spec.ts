import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AluguelCreateComponent } from './aluguel-create.component';

describe('AluguelCreateComponent', () => {
  let component: AluguelCreateComponent;
  let fixture: ComponentFixture<AluguelCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AluguelCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AluguelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendientePostulacionComponent } from './pendiente-postulacion.component';

describe('PendientePostulacionComponent', () => {
  let component: PendientePostulacionComponent;
  let fixture: ComponentFixture<PendientePostulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendientePostulacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendientePostulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

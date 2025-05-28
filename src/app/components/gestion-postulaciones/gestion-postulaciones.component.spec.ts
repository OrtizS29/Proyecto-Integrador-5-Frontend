import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPostulacionesComponent } from './gestion-postulaciones.component';

describe('GestionPostulacionesComponent', () => {
  let component: GestionPostulacionesComponent;
  let fixture: ComponentFixture<GestionPostulacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPostulacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionPostulacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

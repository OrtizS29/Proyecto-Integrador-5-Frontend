import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarBrigadistaComponent } from './actualizar-brigadista.component';

describe('ActualizarBrigadistaComponent', () => {
  let component: ActualizarBrigadistaComponent;
  let fixture: ComponentFixture<ActualizarBrigadistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarBrigadistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarBrigadistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

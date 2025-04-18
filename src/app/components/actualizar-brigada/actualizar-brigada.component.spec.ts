import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarBrigadaComponent } from './actualizar-brigada.component';

describe('ActualizarBrigadaComponent', () => {
  let component: ActualizarBrigadaComponent;
  let fixture: ComponentFixture<ActualizarBrigadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarBrigadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarBrigadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

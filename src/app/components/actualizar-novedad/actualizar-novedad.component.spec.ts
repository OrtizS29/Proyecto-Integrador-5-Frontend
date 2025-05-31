import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarNovedadComponent } from './actualizar-novedad.component';

describe('ActualizarNovedadComponent', () => {
  let component: ActualizarNovedadComponent;
  let fixture: ComponentFixture<ActualizarNovedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarNovedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarNovedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

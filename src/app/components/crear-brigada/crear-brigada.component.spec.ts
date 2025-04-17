import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearBrigadaComponent } from './crear-brigada.component';

describe('CrearBrigadaComponent', () => {
  let component: CrearBrigadaComponent;
  let fixture: ComponentFixture<CrearBrigadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearBrigadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearBrigadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

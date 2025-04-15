import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBrigadasComponent } from './gestion-brigadas.component';

describe('GestionBrigadasComponent', () => {
  let component: GestionBrigadasComponent;
  let fixture: ComponentFixture<GestionBrigadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionBrigadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionBrigadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrigadistaContactoComponent } from './brigadista-contacto.component';

describe('BrigadistaContactoComponent', () => {
  let component: BrigadistaContactoComponent;
  let fixture: ComponentFixture<BrigadistaContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrigadistaContactoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrigadistaContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

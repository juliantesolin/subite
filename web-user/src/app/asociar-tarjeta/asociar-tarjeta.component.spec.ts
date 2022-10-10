import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarTarjetaComponent } from './asociar-tarjeta.component';

describe('AsociarTarjetaComponent', () => {
  let component: AsociarTarjetaComponent;
  let fixture: ComponentFixture<AsociarTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsociarTarjetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsociarTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

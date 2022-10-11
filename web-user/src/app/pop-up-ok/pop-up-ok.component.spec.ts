import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpOkComponent } from './pop-up-ok.component';

describe('PopUpOkComponent', () => {
  let component: PopUpOkComponent;
  let fixture: ComponentFixture<PopUpOkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpOkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

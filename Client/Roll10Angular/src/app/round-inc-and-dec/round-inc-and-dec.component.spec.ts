import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundIncAndDecComponent } from './round-inc-and-dec.component';

describe('RoundIncAndDecComponent', () => {
  let component: RoundIncAndDecComponent;
  let fixture: ComponentFixture<RoundIncAndDecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundIncAndDecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundIncAndDecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

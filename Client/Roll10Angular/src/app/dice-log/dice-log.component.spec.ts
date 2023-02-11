import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceLogComponent } from './dice-log.component';

describe('DiceLogComponent', () => {
  let component: DiceLogComponent;
  let fixture: ComponentFixture<DiceLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiceLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiceLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

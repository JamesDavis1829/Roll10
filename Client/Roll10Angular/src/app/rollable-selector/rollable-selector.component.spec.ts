import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollableSelectorComponent } from './rollable-selector.component';

describe('RollableSelectorComponent', () => {
  let component: RollableSelectorComponent;
  let fixture: ComponentFixture<RollableSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollableSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollableSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

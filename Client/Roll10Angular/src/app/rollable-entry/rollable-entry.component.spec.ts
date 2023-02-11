import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollableEntryComponent } from './rollable-entry.component';

describe('RollableEntryComponent', () => {
  let component: RollableEntryComponent;
  let fixture: ComponentFixture<RollableEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollableEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollableEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

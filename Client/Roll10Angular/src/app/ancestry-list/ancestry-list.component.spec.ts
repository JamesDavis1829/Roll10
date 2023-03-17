import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AncestryListComponent } from './ancestry-list.component';

describe('AncestryListComponent', () => {
  let component: AncestryListComponent;
  let fixture: ComponentFixture<AncestryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AncestryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AncestryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

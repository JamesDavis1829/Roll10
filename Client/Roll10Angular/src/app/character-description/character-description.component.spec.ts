import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDescriptionComponent } from './character-description.component';

describe('CharacterDescriptionComponent', () => {
  let component: CharacterDescriptionComponent;
  let fixture: ComponentFixture<CharacterDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

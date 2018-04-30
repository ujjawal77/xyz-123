import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsAndPlayersComponent } from './teams-and-players.component';

describe('TeamsAndPlayersComponent', () => {
  let component: TeamsAndPlayersComponent;
  let fixture: ComponentFixture<TeamsAndPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsAndPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsAndPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

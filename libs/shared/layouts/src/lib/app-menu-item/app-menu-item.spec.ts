import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMenuItem } from './app-menu-item';

describe('AppMenuItem', () => {
  let component: AppMenuItem;
  let fixture: ComponentFixture<AppMenuItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMenuItem],
    }).compileComponents();

    fixture = TestBed.createComponent(AppMenuItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

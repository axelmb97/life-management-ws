import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppGlobalToast } from './app-global-toast';

describe('AppGlobalToast', () => {
  let component: AppGlobalToast;
  let fixture: ComponentFixture<AppGlobalToast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppGlobalToast],
    }).compileComponents();

    fixture = TestBed.createComponent(AppGlobalToast);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

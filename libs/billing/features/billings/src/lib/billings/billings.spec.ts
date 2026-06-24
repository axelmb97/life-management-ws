import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Billings } from './billings';

describe('Billings', () => {
  let component: Billings;
  let fixture: ComponentFixture<Billings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Billings],
    }).compileComponents();

    fixture = TestBed.createComponent(Billings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

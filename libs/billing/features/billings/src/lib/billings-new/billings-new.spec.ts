import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillingsNew } from './billings-new';

describe('BillingsNew', () => {
  let component: BillingsNew;
  let fixture: ComponentFixture<BillingsNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingsNew],
    }).compileComponents();

    fixture = TestBed.createComponent(BillingsNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

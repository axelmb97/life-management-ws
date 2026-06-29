import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillingsEdit } from './billings-edit';

describe('BillingsEdit', () => {
  let component: BillingsEdit;
  let fixture: ComponentFixture<BillingsEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingsEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(BillingsEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

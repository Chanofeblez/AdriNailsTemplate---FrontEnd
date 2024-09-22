import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountdeletionpolicyPage } from './accountdeletionpolicy.page';

describe('AccountdeletionpolicyPage', () => {
  let component: AccountdeletionpolicyPage;
  let fixture: ComponentFixture<AccountdeletionpolicyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AccountdeletionpolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

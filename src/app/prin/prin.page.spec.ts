import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrinPage } from './prin.page';

describe('PrinPage', () => {
  let component: PrinPage;
  let fixture: ComponentFixture<PrinPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PrinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

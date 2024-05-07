import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsesPage } from './inses.page';

describe('InsesPage', () => {
  let component: InsesPage;
  let fixture: ComponentFixture<InsesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InsesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendarPagePage } from './agendar-page.page';

describe('AgendarPagePage', () => {
  let component: AgendarPagePage;
  let fixture: ComponentFixture<AgendarPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgendarPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

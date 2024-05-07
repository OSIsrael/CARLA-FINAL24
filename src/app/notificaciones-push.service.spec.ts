import { TestBed } from '@angular/core/testing';

import { NotificacionesPushService } from './notificaciones-push.service';

describe('NotificacionesPushService', () => {
  let service: NotificacionesPushService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificacionesPushService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

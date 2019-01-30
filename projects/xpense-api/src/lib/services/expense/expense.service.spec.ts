import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { CommonModule } from '@angular/common';
import { ExpenseService } from './expense.service';

describe('ExpenseService', () => {
  let injector: TestBed;
  let service: ExpenseService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: APP_CONFIG, useValue: AppConfig }
      ]
    });
    injector = getTestBed();
    service = injector.get(ExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

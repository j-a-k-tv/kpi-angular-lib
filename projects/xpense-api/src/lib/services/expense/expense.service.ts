import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpenseItem } from '../../models/ExpenseItem';
import { ExpenseItemVM } from '../../models/ExpenseItemVM';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APP_CONFIG, IAppConfig } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private _base_url: string;
  private _api_path: string;

  constructor(private _http: HttpClient, @Inject(APP_CONFIG) private _config: IAppConfig) {
    this._base_url = this._config.apiEndpoint;
    this._api_path = this._config.expensesApi;
  }

  getAll(): Observable<ExpenseItemVM[]> {
    return this._http.get(`${this._base_url}${this._api_path}`)
      .pipe(map((data: Array<ExpenseItemVM>) => data.map(inst => ExpenseItemVM.from(inst))))
  }

  get(id: number): Observable<ExpenseItemVM> {
    return this._http.get(`${this._base_url}${this._api_path}${id}`)
      .pipe(map((data: ExpenseItemVM) => ExpenseItemVM.from(data)))
  }

  create(data: ExpenseItem): Observable<ExpenseItemVM> {
    return this._http.post(`${this._base_url}${this._api_path}`, data)
      .pipe(map((data: ExpenseItemVM) => ExpenseItemVM.from(data)))
  }

  update(id: number, data: ExpenseItem): Observable<ExpenseItemVM> {
    return this._http.put(`${this._base_url}${this._api_path}${id}`, data)
      .pipe(map((data: ExpenseItemVM) => ExpenseItemVM.from(data)))
  }

  delete(id: number): Observable<void> {
    return this._http.delete(`${this._base_url}${this._api_path}${id}`)
      .pipe(map(() => { }))
  }

  deleteMany(ids: number[]): Observable<void> {
    let idx = ids.map(id => id.toString());
    return this._http.delete(`${this._base_url}${this._api_path}batch`, { params: { ids: idx } })
      .pipe(map(() => { }))
  }
}

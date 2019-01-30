import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CategoryItemVM } from '../../models/CategoryItemVM';
import { CategoryItem } from '../../models/CategoryItem';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APP_CONFIG, IAppConfig } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _base_url: string;
  private _api_path: string;

  constructor(private _http: HttpClient, @Inject(APP_CONFIG) private _config: IAppConfig) {
    this._base_url = this._config.apiEndpoint;
    this._api_path = this._config.categoriesApi;
  }

  getAll(): Observable<CategoryItemVM[]> {
    return this._http.get(`${this._base_url}${this._api_path}`)
      .pipe(map((data: Array<CategoryItemVM>) => data.map(inst => CategoryItemVM.from(inst))))
  }

  get(id: number): Observable<CategoryItemVM> {
    return this._http.get(`${this._base_url}${this._api_path}${id}`)
      .pipe(map((data: CategoryItemVM) => CategoryItemVM.from(data)))
  }

  create(data: CategoryItem): Observable<CategoryItemVM> {
    return this._http.post(`${this._base_url}${this._api_path}`, data)
      .pipe(map((data: CategoryItemVM) => CategoryItemVM.from(data)))
  }

  update(id: number, data: CategoryItem): Observable<CategoryItemVM> {
    return this._http.put(`${this._base_url}${this._api_path}${id}`, data)
      .pipe(map((data: CategoryItemVM) => CategoryItemVM.from(data)))
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

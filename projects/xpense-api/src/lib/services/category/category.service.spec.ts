import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { CategoryItemVM } from '../../models/CategoryItemVM';

describe('CategoryService', () => {

  let injector: TestBed;
  let service: CategoryService;
  let httpTestingController: HttpTestingController;

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
    service = injector.get(CategoryService);
    httpTestingController = injector.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });



  describe('#getAll', () => {

    let expectedCategories: CategoryItemVM[];
    let jsonCategories: any = [
      {
        "id": 1,
        "label": "Cat 1",
        "description": "category 1",
        "createdOn": "2019-01-27T10:39:15.390Z",
        "updatedOn": "2019-01-27T10:39:15.390Z"
      },
      {
        "id": 2,
        "label": "Cat 2",
        "description": "category 2",
        "createdOn": "2019-01-27T10:39:26.208Z",
        "updatedOn": "2019-01-27T10:39:26.208Z"
      }
    ];

    beforeEach(() => {

      expectedCategories = jsonCategories.map(x => CategoryItemVM.from(x));
    });

    it('should return expected categories (called once)', () => {

      service.getAll().subscribe(
        categories => expect(categories).toEqual(expectedCategories, 'should return expected categories'),
        fail
      );

      // CategoryService should have made one request to GET categories from expected URL
      const req = httpTestingController.expectOne(`${AppConfig.apiEndpoint}${AppConfig.categoriesApi}`);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock categories
      req.flush(jsonCategories);
    });

    it('should be OK returning no categories', () => {

      service.getAll().subscribe(
        categories => expect(categories.length).toEqual(0, 'should have empty categories array'),
        fail
      );

      const req = httpTestingController.expectOne(`${AppConfig.apiEndpoint}${AppConfig.categoriesApi}`);
      req.flush([]); // Respond with no categories
    });

    it('should return expected categories (called multiple times)', () => {

      service.getAll().subscribe();
      service.getAll().subscribe();
      service.getAll().subscribe(
        categories => expect(categories).toEqual(expectedCategories, 'should return expected categories'),
        fail
      );

      const requests = httpTestingController.match(`${AppConfig.apiEndpoint}${AppConfig.categoriesApi}`);
      expect(requests.length).toEqual(3, 'calls to getAll()');

      // Respond to each request with different mock category results
      requests[0].flush([]);
      requests[1].flush([jsonCategories[0]]);
      requests[2].flush(jsonCategories);
    });

  });


  describe('#get', () => {

    let expectedCategories: CategoryItemVM[];
    let jsonCategories: any = [
      {
        "id": 1,
        "label": "Cat 1",
        "description": "category 1",
        "createdOn": "2019-01-27T10:39:15.390Z",
        "updatedOn": "2019-01-27T10:39:15.390Z"
      },
      {
        "id": 2,
        "label": "Cat 2",
        "description": "category 2",
        "createdOn": "2019-01-27T10:39:26.208Z",
        "updatedOn": "2019-01-27T10:39:26.208Z"
      }
    ];

    beforeEach(() => {

      expectedCategories = jsonCategories.map(x => CategoryItemVM.from(x));
    });

    it('should return expected category (called once)', () => {

      service.get(jsonCategories[0].id).subscribe(
        category => expect(category).toEqual(expectedCategories[0], 'should return expected category'),
        fail
      );

      // CategoryService should have made one request to GET categories from expected URL
      const req = httpTestingController
        .expectOne(`${AppConfig.apiEndpoint}${AppConfig.categoriesApi}${jsonCategories[0].id}`);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock categories
      req.flush(jsonCategories[0]);
    });

    it('should throw 404 error when category is not found', () => {

      service.get(jsonCategories[0].id).subscribe(
        fail,
        error => expect(error.status).toEqual(404, 'should have 404 error status'),
      );

      const req = httpTestingController
        .expectOne(`${AppConfig.apiEndpoint}${AppConfig.categoriesApi}${jsonCategories[0].id}`);
      req.flush('deleberate 404 error', { status: 404, statusText: 'Not Found' });
    });

    it('should throw TypeError when invalid data is received', () => {

      service.get(jsonCategories[0].id).subscribe(
        fail,
        error => expect(error instanceof TypeError).toBeTruthy()
      );

      const req = httpTestingController
        .expectOne(`${AppConfig.apiEndpoint}${AppConfig.categoriesApi}${jsonCategories[0].id}`);
      req.flush([]);
    });

    it('should return expected category (called multiple times)', () => {

      service.get(jsonCategories[0].id).subscribe();
      service.get(jsonCategories[0].id).subscribe();
      service.get(jsonCategories[0].id).subscribe(
        category => expect(category).toEqual(expectedCategories[0], 'should return expected category'),
        fail
      );

      const requests = httpTestingController
        .match(`${AppConfig.apiEndpoint}${AppConfig.categoriesApi}${jsonCategories[0].id}`);
      expect(requests.length).toEqual(3, 'calls to get()');


      // Respond to each request with different mock category results
      requests[0].flush(jsonCategories[0]);
      requests[1].flush(jsonCategories[0]);
      requests[2].flush(jsonCategories[0]);
    });

  });

});

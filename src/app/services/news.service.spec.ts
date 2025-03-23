import { TestBed } from '@angular/core/testing';
import { NewsService } from './news.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { INewsQueryParams } from '../models/query-params.model';
import { NewsCategory } from '../core/enums/news-category.enum';

describe('NewsService', () => {
  let newsService: NewsService;
  let httpTestingController: HttpTestingController;

  const getQueryParams = (searchText: string | undefined = undefined): INewsQueryParams => {
    return {
      category: NewsCategory.General,
      page: 1,
      searchText: searchText
    };
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService],
    });

    newsService = TestBed.inject(NewsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should call http GET with the correct url', () => {
    // Arrange
    const params = getQueryParams();
    const expectedUrl = 'https://newsapi.org/v2/top-headlines?category=general&pageSize=12&page=1&apiKey=69ebebda77cf4d7f831fbb4074608e70';

    // Act
    newsService.get(params).subscribe();

    // Assert
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(params);
  });

  it('should call http GET with the provided search text', () => {
    // Arrange
    const params = getQueryParams('Ukraine');
    const expectedUrl = 'https://newsapi.org/v2/top-headlines?category=general&pageSize=12&page=1&apiKey=69ebebda77cf4d7f831fbb4074608e70&q=Ukraine';

    // Act
    newsService.get(params).subscribe();

    // Assert
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(params);
  });
});

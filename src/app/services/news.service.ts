import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { DEFAULT_PAGE_SIZE } from "../core/constants/constants";
import { INewsApiResponseModel } from "../models/news-api-response.model";
import { INewsQueryParams } from "../models/query-params.model";

@Injectable({
  providedIn: "root"
})
export class NewsService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl;
  private readonly apiKey = environment.apiKey;

  get(params: INewsQueryParams): Observable<INewsApiResponseModel> {
    let httpParams = new HttpParams()
      .set('category', params.category)
      .set('pageSize', DEFAULT_PAGE_SIZE)
      .set('page', params.page.toString())
      .set('apiKey', this.apiKey);

    if (params.searchText) {
      httpParams = httpParams.set('q', params.searchText);
    }

    return this.http.get<INewsApiResponseModel>(this.url, { params: httpParams });
  }
}
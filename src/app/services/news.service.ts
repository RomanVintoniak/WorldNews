import { inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { INewsApiResponseModel } from "../models/news-api-response.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { NewsQueryParams } from "../models/query-params.model";

@Injectable({
  providedIn: "root"
})
export class NewsService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl;
  private readonly apiKey = environment.apiKey;
  private readonly defaultPageSize = 12;

  NewsApiResponse: INewsApiResponseModel = {
    totalResults: 6,
    status: 'ok',
    articles: [
      {
        source: {
          id: "bbc-news",
          name: "BBC News"
        },
        author: "BBC News",
        title: "Archaeologists uncover Bronze Age stone circle in Farley Wood",
        description: "The \"hugely significant\" discovery in a forest in Derbyshire is thought to date back 3,700 years.",
        url: "https://www.bbc.co.uk/news/articles/c5y06r662jzo",
        urlToImage: "https://ichef.bbci.co.uk/ace/branded_news/1200/cpsprodpb/e3c4/live/1b8f0560-067a-11f0-8777-f3a97186d396.png",
        publishedAt: new Date(),
        content: "Dr Lawrence Shaw, Forestry England's lead historic environment adviser, said the discovery, which will feature in an episode aired on Time Teams YouTube channel on Saturday, was \"hugely significant a… [+498 chars]"
      },
      {
        source: {
          id: "bbc-news",
          name: "BBC News"
        },
        author: "BBC News",
        title: "Archaeologists uncover Bronze Age stone circle in Farley Wood",
        description: "The \"hugely significant\" discovery in a forest in Derbyshire is thought to date back 3,700 years.",
        url: "https://www.bbc.co.uk/news/articles/c5y06r662jzo",
        urlToImage: "https://ichef.bbci.co.uk/ace/branded_news/1200/cpsprodpb/e3c4/live/1b8f0560-067a-11f0-8777-f3a97186d396.png",
        publishedAt: new Date(),
        content: "Dr Lawrence Shaw, Forestry England's lead historic environment adviser, said the discovery, which will feature in an episode aired on Time Teams YouTube channel on Saturday, was \"hugely significant a… [+498 chars]"
      },
      {
        source: {
          id: "bbc-news",
          name: "BBC News"
        },
        author: "BBC News",
        title: "Archaeologists uncover Bronze Age stone circle in Farley Wood",
        description: "The \"hugely significant\" discovery in a forest in Derbyshire is thought to date back 3,700 years.",
        url: "https://www.bbc.co.uk/news/articles/c5y06r662jzo",
        urlToImage: "https://ichef.bbci.co.uk/ace/branded_news/1200/cpsprodpb/e3c4/live/1b8f0560-067a-11f0-8777-f3a97186d396.png",
        publishedAt: new Date(),
        content: "Dr Lawrence Shaw, Forestry England's lead historic environment adviser, said the discovery, which will feature in an episode aired on Time Teams YouTube channel on Saturday, was \"hugely significant a… [+498 chars]"
      },
      {
        source: {
          id: "bbc-news",
          name: "BBC News"
        },
        author: "BBC News",
        title: "Archaeologists uncover Bronze Age stone circle in Farley Wood",
        description: "The \"hugely significant\" discovery in a forest in Derbyshire is thought to date back 3,700 years.",
        url: "https://www.bbc.co.uk/news/articles/c5y06r662jzo",
        urlToImage: "https://ichef.bbci.co.uk/ace/branded_news/1200/cpsprodpb/e3c4/live/1b8f0560-067a-11f0-8777-f3a97186d396.png",
        publishedAt: new Date(),
        content: "Dr Lawrence Shaw, Forestry England's lead historic environment adviser, said the discovery, which will feature in an episode aired on Time Teams YouTube channel on Saturday, was \"hugely significant a… [+498 chars]"
      },
      {
        source: {
          id: "bbc-news",
          name: "BBC News"
        },
        author: "BBC News",
        title: "Archaeologists uncover Bronze Age stone circle in Farley Wood",
        description: "The \"hugely significant\" discovery in a forest in Derbyshire is thought to date back 3,700 years.",
        url: "https://www.bbc.co.uk/news/articles/c5y06r662jzo",
        urlToImage: "https://ichef.bbci.co.uk/ace/branded_news/1200/cpsprodpb/e3c4/live/1b8f0560-067a-11f0-8777-f3a97186d396.png",
        publishedAt: new Date(),
        content: "Dr Lawrence Shaw, Forestry England's lead historic environment adviser, said the discovery, which will feature in an episode aired on Time Teams YouTube channel on Saturday, was \"hugely significant a… [+498 chars]"
      },
      {
        source: {
          id: "bbc-news",
          name: "BBC News"
        },
        author: "BBC News",
        title: "Archaeologists uncover Bronze Age stone circle in Farley Wood",
        description: "The \"hugely significant\" discovery in a forest in Derbyshire is thought to date back 3,700 years.",
        url: "https://www.bbc.co.uk/news/articles/c5y06r662jzo",
        urlToImage: "https://ichef.bbci.co.uk/ace/branded_news/1200/cpsprodpb/e3c4/live/1b8f0560-067a-11f0-8777-f3a97186d396.png",
        publishedAt: new Date(),
        content: "Dr Lawrence Shaw, Forestry England's lead historic environment adviser, said the discovery, which will feature in an episode aired on Time Teams YouTube channel on Saturday, was \"hugely significant a… [+498 chars]"
      }
    ]
  };

  getMocked(): Observable<INewsApiResponseModel> {
    return of(this.NewsApiResponse);
  }

  get(params: NewsQueryParams): Observable<INewsApiResponseModel> {
    const httpParams = new HttpParams()
    .set('country', 'us')
    .set('pageSize', this.defaultPageSize)
    .set('page', params.page.toString())
    .set('apiKey', this.apiKey);

    if (params.category) {
      httpParams.set('category', params.category);
    }

    if (params.searchText) {
      httpParams.set('q', params.searchText);
    }

    return this.http.get<INewsApiResponseModel>(this.url, { params: httpParams});
  }
}
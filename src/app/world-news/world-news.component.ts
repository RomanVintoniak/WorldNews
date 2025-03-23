import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { debounceTime, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { DEFAULT_PAGE_SIZE, SEARCH_INPUT_DELAY } from '../core/constants/constants';
import { NewsCategory } from '../core/enums/news-category.enum';
import { INewsApiResponseModel } from '../models/news-api-response.model';
import { INewsQueryParams } from '../models/query-params.model';
import { NewsService } from '../services/news.service';
import { NewsCardComponent } from './news-card/news-card.component';

@Component({
  selector: 'app-world-news',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InfiniteScrollDirective,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    NewsCardComponent
  ],
  templateUrl: './world-news.component.html',
  styleUrl: './world-news.component.scss'
})
export class WorldNewsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private readonly newsService = inject(NewsService);

  newsCategory = NewsCategory;
  scrollDistance = 1;
  scrollThrottle = 2000;

  searchControl = new FormControl('');
  categoryControl = new FormControl<NewsCategory>(NewsCategory.General);
  loading = false;
  hasNextPage = true;

  newsParams: INewsQueryParams = {
    category: NewsCategory.General,
    page: 1,
  };

  news: INewsApiResponseModel = {
    status: '',
    totalResults: 0,
    articles: []
  };

  ngOnInit() {
    this.getNews();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(SEARCH_INPUT_DELAY),
        tap((value) => {
          this.loading = true;
          this.hasNextPage = true;
          this.newsParams.page = 1;
          this.newsParams.searchText = value ?? ''
        }),
        switchMap(() => this.newsService.get(this.newsParams)),
        takeUntil(this.destroy$)
      ).subscribe(data => {
        this.news = data;
        this.loading = false;
      });
  }

  onCategoryChange(category: NewsCategory) {
    this.newsParams.category = category;
    this.newsParams.page = 1;
    this.hasNextPage = true;
    this.getNews();
  }

  onScroll() {
    if (!this.hasNextPage) {
      return;
    }

    this.loading = true;
    this.newsParams.page++;
    
    this.newsService.get(this.newsParams).subscribe({
      next: (data) => {
        if (data.articles.length < DEFAULT_PAGE_SIZE) {
          this.hasNextPage = false;
        }

        this.news.articles = this.news.articles.concat(data.articles);
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      }
    });
  }

  getNews() {
    this.loading = true;
    this.newsService.get(this.newsParams).subscribe({
      next: (data) => {
        this.news = data;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

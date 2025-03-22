import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NewsCategory } from '../core/enums/news-category.enum';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { DEFAULT_PAGE_SIZE, SEARCH_INPUT_DELAY } from '../core/constants/constants';
import { NewsService } from '../services/news.service';
import { INewsApiResponseModel } from '../models/news-api-response.model';
import { NewsCardComponent } from './news-card/news-card.component';
import { CommonModule } from '@angular/common';
import { NewsQueryParams } from '../models/query-params.model';

@Component({
  selector: 'app-world-news',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    InfiniteScrollDirective,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule,
    NewsCardComponent
  ],
  templateUrl: './world-news.component.html',
  styleUrl: './world-news.component.scss'
})
export class WorldNewsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  newsService = inject(NewsService);

  newsCategory = NewsCategory;
  scrollDistance = 1;
  scrollThrottle = 2000 // 1.2sec;

  searchControl = new FormControl('');
  isLoading = false;
  finished = false;

  newsQueryParams: NewsQueryParams = {
    category: NewsCategory.General,
    page: 1,
  }

  news: INewsApiResponseModel = {
    status: '',
    totalResults: 0,
    articles: []
  }

  ngOnInit() {
    this.getNews();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(SEARCH_INPUT_DELAY),
        takeUntil(this.destroy$)
      ).subscribe(value => {
        console.log('Inputted value', value);
      });
  }

  onCategoryChange(category: NewsCategory) {
    console.log('Chosen category: ', category);
  }

  onScroll() {
    if (this.finished) {
      return;
    }

    this.isLoading = true;
    this.newsQueryParams.page++;
    
    this.newsService.get(this.newsQueryParams).subscribe({
      next: (data) => {
        if (data.articles.length < DEFAULT_PAGE_SIZE) {
          this.finished = true;
        }

        this.news.articles = this.news.articles.concat(data.articles);
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    });
  }

  getNews() {
    this.isLoading = true;
    this.newsService.get(this.newsQueryParams).subscribe({
      next: (data) => {
        this.news = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

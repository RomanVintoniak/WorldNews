import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NewsCategory } from '../core/enums/news-category.enum';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { SEARCH_INPUT_DELAY } from '../core/constants/constants';
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
  searchControl = new FormControl('');
  isLoading = false;

  newsQueryParams: NewsQueryParams = {
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

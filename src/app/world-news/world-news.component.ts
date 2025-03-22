import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NewsCategory } from '../core/enums/news-category.enum';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { SEARCH_INPUT_DELAY } from '../core/constants/constants';

@Component({
  selector: 'app-world-news',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule
  ],
  templateUrl: './world-news.component.html',
  styleUrl: './world-news.component.scss'
})
export class WorldNewsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  
  newsCategory = NewsCategory;
  searchControl = new FormControl('');
  
  ngOnInit() {
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

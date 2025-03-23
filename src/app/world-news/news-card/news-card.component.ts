import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IArticleModel } from '../../models/article.model';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss'
})
export class NewsCardComponent {
  @Input() article!: IArticleModel;
}

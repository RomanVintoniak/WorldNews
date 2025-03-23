import { Component } from '@angular/core';
import { WorldNewsComponent } from "./world-news/world-news.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorldNewsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'World News';
}

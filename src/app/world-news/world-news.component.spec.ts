import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NewsService } from '../services/news.service';
import { WorldNewsComponent } from './world-news.component';

describe('WorldNewsComponent', () => {
  let component: WorldNewsComponent;
  let fixture: ComponentFixture<WorldNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WorldNewsComponent,
        HttpClientTestingModule,
      ],
      providers: [
        NewsService,
        provideAnimationsAsync()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

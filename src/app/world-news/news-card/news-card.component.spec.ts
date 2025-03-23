import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IArticleModel } from '../../models/article.model';
import { NewsCardComponent } from './news-card.component';

describe('NewsCardComponent', () => {
  let component: NewsCardComponent;
  let fixture: ComponentFixture<NewsCardComponent>;

  const articleMock: IArticleModel = {
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
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NewsCardComponent);
    component = fixture.componentInstance;
    component.article = articleMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

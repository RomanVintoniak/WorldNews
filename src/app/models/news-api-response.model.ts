import { IArticleModel } from "./article.model";

export interface INewsApiResponseModel {
  status: string;
  totalResults: number;
  articles: IArticleModel[];
}
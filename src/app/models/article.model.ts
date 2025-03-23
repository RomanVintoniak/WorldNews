import { ISourceModel } from "./source.model";

export interface IArticleModel {
  source: ISourceModel;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: Date;
  content?: string;
}

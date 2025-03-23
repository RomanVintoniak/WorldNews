import { NewsCategory } from "../core/enums/news-category.enum";

export interface INewsQueryParams {
  category: NewsCategory,
  searchText?: string,
  page: number,
}
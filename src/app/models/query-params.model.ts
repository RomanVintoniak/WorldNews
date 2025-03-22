import { NewsCategory } from "../core/enums/news-category.enum";

export interface NewsQueryParams {
  category: NewsCategory,
  searchText?: string,
  page: number,
}
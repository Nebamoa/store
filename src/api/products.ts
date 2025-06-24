import { SearchProductParams } from "../redux/slices/productSlice";
import { instanceProducts } from ".";

export const productsApi = {
  getCategoryProducts({ categoryId, currentPage, sort }: SearchProductParams) {
    const params: Record<string, string | number> = {
      _page: currentPage,
      _per_page: 6,
      _sort: sort.sortProperty,
    };

    // добавляем параметр category, только если выбран конкретный id
    if (categoryId !== 0) {
      params.category = categoryId;
    }

    return instanceProducts.get("/", { params });
  },
};

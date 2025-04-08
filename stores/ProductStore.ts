import { makeAutoObservable, runInAction } from "mobx";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  features: string[];
}

class ProductStore {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = "";
  visibleCount: number = 6;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  initialize(products: Product[]) {
    this.isLoading = true;
    setTimeout(() => {
      runInAction(() => {
        this.products = products;
        this.filterProducts();
        this.isLoading = false;
      });
    }, 300);
  }

  getProductById(id: string): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
    this.filterProducts();
  }

  filterProducts() {
    if (!this.searchQuery) {
      this.filteredProducts = this.products;
    } else {
      const searchLower = this.searchQuery.toLowerCase();
      this.filteredProducts = this.products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
      );
    }
  }

  loadMore() {
    this.visibleCount = Math.min(
      this.visibleCount + 3,
      this.filteredProducts.length
    );
  }

  get visibleProducts() {
    return this.filteredProducts.slice(0, this.visibleCount);
  }

  get hasMoreProducts() {
    return this.visibleCount < this.filteredProducts.length;
  }

  get isProductsEmpty() {
    return this.filteredProducts.length === 0;
  }
}

export default new ProductStore();

declare module "*/products.json" {
  import { Product } from "../stores/ProductStore";

  const products: Product[];
  export default products;
}

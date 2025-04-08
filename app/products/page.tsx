import React from "react";
import Products from "@/components/Products";
import productsData from "@/data/products.json";
const ProductsPage = () => {
  return <Products initialProducts={productsData} />;
};

export default ProductsPage;

"use client";
import { Product } from "@/stores/ProductStore";
import { useEffect } from "react";

const ProductMetaData = ({ product }: { product: Product }) => {
  useEffect(() => {
    document.title = `${product.name} - Product Details`;
    const metaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement;
    if (metaDescription) {
      metaDescription.content = product.description;
    }

    const metaOpenGraphTitle = document.querySelector(
      'meta[property="og:title"]'
    ) as HTMLMetaElement;
    if (metaOpenGraphTitle) {
      metaOpenGraphTitle.content = product.name;
    }

    const metaOpenGraphDescription = document.querySelector(
      'meta[property="og:description"]'
    ) as HTMLMetaElement;
    if (metaOpenGraphDescription) {
      metaOpenGraphDescription.content = product.description;
    }

    const metaOpenGraphImage = document.querySelector(
      'meta[property="og:image"]'
    ) as HTMLMetaElement;
    if (metaOpenGraphImage) {
      metaOpenGraphImage.content = product.images[0];
    }
  }, [product]);

  return null;
};
export default ProductMetaData;

import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import ProductDetailPageClient from "@/components/ProductDetailPageClient";
import ProductMetaData from "@/components/ProductMetaData";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  features: string[];
}

const getProductData = async (id: string): Promise<Product | null> => {
  const filePath = path.resolve(process.cwd(), "data", "products.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return data.find((product: Product) => product.id === id) || null;
};

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductData(params.id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductMetaData product={product} />
      <ProductDetailPageClient product={product} />
    </>
  );
}

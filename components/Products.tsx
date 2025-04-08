"use client";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ArrowDown } from "lucide-react";
import Button from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import productStore from "@/stores/ProductStore";
import type { Product } from "@/stores/ProductStore";

const Products = observer(
  ({ initialProducts }: { initialProducts: Product[] }) => {
    useEffect(() => {
      productStore.initialize(initialProducts);
    }, [initialProducts]);

    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl text-center md:text-4xl font-medium tracking-tight mb-2">
            Все товары
          </h1>
          <p className="text-gray-500 text-center">
            Откройте для себя идеальные устройства Apple, которые органично
            впишутся в вашу жизнь. Элегантный дизайн и невероятная мощность.
          </p>
        </div>

        {productStore.isLoading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <p className="text-gray-500">Загрузка товаров</p>
          </div>
        ) : productStore.isProductsEmpty ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center">
            <h2 className="text-2xl font-medium mb-2">Товары не найдены</h2>
            <p className="text-gray-500 mb-4">
              Попробуйте изменить свои критерии поиска.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {productStore.visibleProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {productStore.hasMoreProducts && (
              <div className="flex justify-center mt-12">
                <Button
                  className="flex items-center gap-2 text-apple-blue border-apple-blue/30 hover:bg-apple-blue/5"
                  onClick={() => productStore.loadMore()}
                >
                  <span>Показать больше</span>
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

export default Products;

"use client";
import React, { useState } from "react";
import Button from "@/components/ui/button";
import { Plus, ArrowLeft, Package2, Truck, ShieldCheck } from "lucide-react";
import cartStore from "@/stores/CartStore";
import Link from "next/link";
import { Product } from "@/stores/ProductStore";

const ProductDetailPageClient = ({ product }: { product: Product }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      cartStore.addToCart(product);
      setIsAdding(false);
    }, 800);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Назад к списку продуктов */}
      <div className="mb-8">
        <Link
          href="/products"
          className="inline-flex items-center text-sm text-gray-500 hover:text-apple-blue transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Назад
        </Link>
      </div>

      {/* Основная информация о продукте */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Изображение продукта */}
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-8">
          <img
            src={product.images[0]}
            alt={product.name}
            className="max-w-full max-h-[500px] object-contain"
          />
        </div>

        {/* Детали продукта */}
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="text-sm text-apple-blue">{product.category}</span>
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight mt-1 mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-medium mb-6">
              {formatPrice(product.price)}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>
          </div>

          {/* Характеристики */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Характеристики</h2>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-apple-blue/10 flex items-center justify-center mr-2 mt-0.5">
                    <div className="h-1.5 w-1.5 bg-apple-blue rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Дополнительная информация о товаре */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Package2 className="h-5 w-5 text-apple-blue mr-3" />
              <div>
                <p className="text-sm font-medium">В наличии на складе</p>
                <p className="text-xs text-gray-500">Готово к отправке</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Truck className="h-5 w-5 text-apple-blue mr-3" />
              <div>
                <p className="text-sm font-medium">Бесплатная доставка</p>
                <p className="text-xs text-gray-500">2-3 рабочих дня</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-apple-blue mr-3" />
              <div>
                <p className="text-sm font-medium">Гарантия 2 года</p>
                <p className="text-xs text-gray-500">Гарантия производителя</p>
              </div>
            </div>
          </div>

          {/* Кнопка добавления в корзину */}
          <div className="mt-auto">
            <Button
              className="w-full apple-button py-6 text-base relative overflow-hidden"
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              {isAdding ? (
                <span className="flex items-center gap-2">
                  <span className="animate-pulse">Добавляем в корзину...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  <span>Добавить в корзину</span>
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPageClient;

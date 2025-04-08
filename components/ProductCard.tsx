"use client";
import { useState } from "react";
import Link from "next/link";
import { observer } from "mobx-react";
import { Plus } from "lucide-react";
import Button from "./ui/button";
import cartStore from "@/stores/CartStore";
import { Product } from "@/stores/ProductStore";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = observer(({ product, index }: ProductCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);

    setTimeout(() => {
      cartStore.addToCart(product);
      setIsAnimating(false);
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
    <div
      className="animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link href={`/products/${product.id}`} className="block group">
        <div className="product-card h-full flex flex-col overflow-hidden">
          <div className="relative overflow-hidden pt-[100%] bg-gradient-to-b from-gray-50 to-gray-100">
            <img
              src={product.images[0]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
            />
            {isAnimating && (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center animate-float-to-cart">
                  <Plus className="w-6 h-6 text-apple-blue" />
                </div>
              </div>
            )}
          </div>

          <div className="p-6 flex flex-col flex-1 justify-between">
            <div>
              <h3 className="product-title mb-2">{product.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                {product.description.substring(0, 100)}
              </p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="product-price">
                {formatPrice(product.price)}
              </span>
              <Button
                className="rounded-full hover:bg-apple-blue/10"
                onClick={handleAddToCart}
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
});

export default ProductCard;

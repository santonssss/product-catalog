"use client";
import { observer } from "mobx-react";
import Link from "next/link";
import { ShoppingCart, Search } from "lucide-react";
import Button from "./ui/button";
import productStore from "@/stores/ProductStore";
import CartStore from "@/stores/CartStore";

const Header = observer(() => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    productStore.setSearchQuery(e.target.value);
  };
  console.log(CartStore);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-medium tracking-tighter">
            Apple market
          </Link>

          <Button className="md:hidden" onClick={() => CartStore.toggleCart()}>
            <ShoppingCart className="h-5 w-5" />
            {CartStore.totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-apple-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {CartStore.totalItems}
              </span>
            )}
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-3xl">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Поиск товаров"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all"
              value={productStore.searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <nav className="hidden md:flex space-x-6">
            <Link
              href="/products"
              className="text-sm font-medium hover:text-apple-blue transition-colors"
            >
              Products
            </Link>
          </nav>

          <Button
            className="hidden md:flex relative"
            onClick={() => CartStore.toggleCart()}
          >
            <ShoppingCart className="h-5 w-5" />
            {CartStore.totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-apple-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {CartStore.totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
});

export default Header;

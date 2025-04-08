import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/button";

const Index = () => {
  return (
    <div>
      <section className="bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
            Сила Apple.
            <br />в твоих руках.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-8">
            Откройте для себя новейшие продукты Apple, тщательно разработанные
            для вашего жизнь. Элегантный, мощный и интуитивно понятный.
          </p>
          <Link href="/products">
            <Button className="apple-button text-base py-6 px-8">
              <span>Browse Products</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-medium tracking-tight text-center mb-16">
            Рекомендуемые продукты
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/products/1" className="group">
              <div className="product-card h-full flex flex-col">
                <div className="relative pt-[100%] bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=1000&q=80"
                    alt="iPhone 15 Pro"
                    className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="product-title">iPhone 15 Pro</h3>
                  <p className="product-price mt-2">$999</p>
                </div>
              </div>
            </Link>

            <Link href="/products/2" className="group">
              <div className="product-card h-full flex flex-col">
                <div className="relative pt-[100%] bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80"
                    alt="MacBook Air M2"
                    className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="product-title">MacBook Air M2</h3>
                  <p className="product-price mt-2">$1,199</p>
                </div>
              </div>
            </Link>

            <Link href="/products/3" className="group">
              <div className="product-card h-full flex flex-col">
                <div className="relative pt-[100%] bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80"
                    alt="iPad Pro"
                    className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="product-title">iPad Pro</h3>
                  <p className="product-price mt-2">$799</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button className="rounded-full border-apple-blue/30 text-apple-blue hover:bg-apple-blue/5">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

"use client";
import React from "react";
import { observer } from "mobx-react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Button from "./ui/button";
import cartStore from "@/stores/CartStore";

const Cart = observer(() => {
  const handleClose = () => {
    cartStore.closeCart();
  };

  const handleIncrement = (productId: string) => {
    const item = cartStore.items.find((item) => item.product.id === productId);
    if (item) {
      cartStore.updateQuantity(productId, item.quantity + 1);
    }
  };

  const handleDecrement = (productId: string) => {
    const item = cartStore.items.find((item) => item.product.id === productId);
    if (item && item.quantity > 1) {
      cartStore.updateQuantity(productId, item.quantity - 1);
    } else {
      cartStore.removeFromCart(productId);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!cartStore.isCartOpen) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={handleClose}
      />

      <div className="fixed bottom-0 left-0 right-0 md:right-auto md:top-0 md:bottom-0 md:w-96 bg-white shadow-lg z-50 transform transition-transform ease-in-out duration-300 translate-y-0 md:translate-x-0">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <span>Ваша корзинка</span>
            {cartStore.totalItems > 0 && (
              <span className="text-sm text-gray-500">
                ({cartStore.totalItems})
              </span>
            )}
          </h2>
          <Button onClick={handleClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex flex-col ">
          {cartStore.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <ShoppingBag className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">Ваша корзина пуста</h3>
              <p className="text-gray-500 mb-4">
                Похоже, вы еще не добавили ни одного товара.
              </p>
              <Button className="apple-button" onClick={handleClose}>
                Продолжайте ходить по магазинам
              </Button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartStore.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center p-2">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-gray-500">
                        {formatPrice(item.product.price)}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          className="w-6 h-6"
                          onClick={() => handleDecrement(item.product.id)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm w-6 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          className="w-6 h-6"
                          onClick={() => handleIncrement(item.product.id)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => cartStore.removeFromCart(item.product.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-t border-gray-100 p-4 bg-white">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Total</span>
            <span className="font-medium">
              {formatPrice(cartStore.totalPrice)}
            </span>
          </div>
          <Button className="w-full apple-button">Оформление заказа</Button>
        </div>
      </div>
    </>
  );
});

export default Cart;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryItemList from "./CategoryItemList";
import { clearCart } from "../utils/cartSlice";

export const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div>
      <div className="text-center m-4 p-4">
        <h1 className="font-bold text-3xl ">Cart</h1>
        <button
          className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring my-5"
          onClick={handleClearCart}
        >
          <span className="absolute inset-0 border border-red-600 group-active:border-red-500 rounded-lg"></span>
          <span className="block border border-red-600 bg-red-600 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1 text-xl rounded-lg">
            clear cart
          </span>
        </button>
      </div>

      <div className="w-6/12 bg-gray-50 shadow-lg mx-auto my-4 p-6">
        {cartItems.length === 0 && (
          <h1 className="font-bold">
            your cart is empty, please add items to the cart
          </h1>
        )}
        <CategoryItemList items={cartItems}></CategoryItemList>
      </div>
    </div>
  );
};
export default Cart;

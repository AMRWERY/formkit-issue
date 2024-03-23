import { defineStore } from "pinia";
// import { getDocs, collection, query, getDoc, doc } from "firebase/firestore";
// import { db } from "@/firebase/config";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      cart: [],
    };
  },

  actions: {
    addToCart(product) {
      const existingCartData = JSON.parse(sessionStorage.getItem("cart")) || [];
      const existingProductIndex = existingCartData.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        existingCartData[existingProductIndex].quantity += 1;
      } else {
        existingCartData.push({ ...product, quantity: product.quantity });
      }
      sessionStorage.setItem("cart", JSON.stringify(existingCartData));
      this.cart = existingCartData;
    },

    getCart() {
      const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];
      // console.log("Cart data:", cartData);
      return cartData;
    },
  },

  getters: {},
});

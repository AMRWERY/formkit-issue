import { defineStore } from "pinia";
import { getDocs, collection, query, getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

export const useExpressProductsStore = defineStore("express-products", {
  state: () => {
    return {
      products: [],
      selectedProduct: null,
    };
  },

  actions: {
    async fetchProducts() {
      const querySnap = await getDocs(
        query(collection(db, "express-products"))
      );
      let products = [];
      querySnap.forEach((doc) => {
        let pro = {
          id: doc.id,
          ...doc.data(),
        };
        products.push(pro);
        // console.log(products);
      });
      this.products = products;
    },

    async getProductById(id) {
      const docSnap = await getDoc(doc(db, "express-products", id));
      if (docSnap.exists()) {
        let product = { ...docSnap.data(), id: id };
        // console.log(product);
        this.selectedProduct = product;
      }
    },
  },

  getters: {
    getProductDetails: (state) => state.products,
  },
});

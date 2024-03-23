import { defineStore } from "pinia";
import { getDocs, collection, query, getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

export const useCartersProductsStore = defineStore("carters-products", {
  state: () => {
    return {
      products: [],
      selectedProduct: null,
      filteredProducts: [],
    };
  },

  actions: {
    async fetchProducts() {
      const querySnap = await getDocs(
        query(collection(db, "carters-products"))
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
      this.filteredProducts = products;
    },

    async getProductById(id) {
      const docSnap = await getDoc(doc(db, "carters-products", id));
      if (docSnap.exists()) {
        let product = { ...docSnap.data(), id: id };
        // console.log(product);
        this.selectedProduct = product;
      }
    },

    filterProductsByPrice(minPrice, maxPrice) {
      if (!minPrice && !maxPrice) {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter((product) => {
          const price =
            (!minPrice || product.price >= minPrice) &&
            (!maxPrice || product.price <= maxPrice);

          return price;
        });
      }
      // console.log("Filtered products in store:", this.filteredProducts);
    },

    filterProductsByCategory(selectedCategories) {
      if (!selectedCategories.length) {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter((product) => {
          for (const selectedCategory of selectedCategories) {
            if (product.category === selectedCategory) {
              return product;
            }
            return false;
          }
        });
      }
      // console.log("Filtered products in store:", this.filteredProducts);
    },

    filterProductsByColor(selectedColor) {
      if (!selectedColor.length) {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter((product) => {
          for (const colorSelected of selectedColor) {
            if (product.color === colorSelected) {
              return product;
            }
            return false;
          }
        });
      }
      // console.log("Filtered products in store:", this.filteredProducts);
    },

    searchProducts(query) {
      this.filteredProducts = this.products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    },
  },

  getters: {
    getProductDetails: (state) => state.products,
    getFilteredProducts: (state) => state.filteredProducts,
  },
});

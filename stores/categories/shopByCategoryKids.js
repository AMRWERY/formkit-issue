import { defineStore } from "pinia";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { storage, db } from "@/firebase/config";
import { getDocs, collection, query } from "firebase/firestore";

export const useShopByCategoryKidsStore = defineStore("shop-by-category-kids", {
  state: () => {
    return {
      images: [],
      files: [],
    };
  },

  actions: {
    async fetchAllImages() {
      try {
        const imagesRef = ref(storage, "/Shop by Category (kids)");
        const imagesList = await listAll(imagesRef);
        for (const imageRef of imagesList.items) {
          const downloadURL = await getDownloadURL(imageRef);
          this.images.push({ name: imageRef.name, url: downloadURL });
        }
        const querySnap = await getDocs(
          query(collection(db, "shop-by-category-kids"))
        );
        let products = [];
        querySnap.forEach((doc) => {
          let pro = {
            id: doc.id,
            ...doc.data(),
          };
          products.push(pro);
          //   console.log(products);
        });
        this.shopByCategoryKids = products;
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    },

    addFile(file) {
      this.files.push(file);
    },

    clearFiles() {
      this.files = [];
    },

    async uploadImg(file) {
      const storage = getStorage();
      const storagePath = "/Shop by Category (kids)/" + file.name;
      const storageRef = ref(storage, storagePath);
      try {
        const snapshot = await uploadBytes(storageRef, file);
        console.log(`File ${file.name} uploaded:`, snapshot);
        this.fetchImg(storagePath);
      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
      }
    },

    async fetchImg(filePath) {
      try {
        const downloadURL = await getDownloadURL(ref(storage, filePath));
        this.images.push({ name: filePath, url: downloadURL });
      } catch (error) {
        console.error(`Error fetching image ${filePath}:`, error);
      }
    },
  },
});

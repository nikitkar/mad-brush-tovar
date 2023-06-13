import { makeAutoObservable } from "mobx";

export default class ProductStore {
  constructor() {
    this._products = [];
    this._categories = [];
    this._allProducts = [];

    makeAutoObservable(this);
  }

  setProduct(product) {
    this._products = product;
  }

  setAllProducts(product) {
    this._allProducts = product;
  }

  setCategory(category) {
    this._categories = category;
  }

  get products() {
    return this._products;
  }

  get allProducts() {
    return this._allProducts;
  }

  get categories() {
    return this._categories;
  }
}

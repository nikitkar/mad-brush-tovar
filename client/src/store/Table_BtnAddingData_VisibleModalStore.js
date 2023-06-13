import { makeAutoObservable } from "mobx";

export default class Table_BtnAddingData_VisibleModalStore {
  constructor() {
    this._nameTable = {
      product: {
        name_ru: "Добавить товар",
        visible: false,
      },
      category: {
        name_ru: "Добавить категорию",
        visible: false,
      },
      pointissue: {
        name_ru: "Добавить пункт доставки",
        visible: false,
      },
      suppliers: {
        name_ru: "Добавить поставщика",
        visible: false,
      },
      invoice: {
        name_ru: "Добавить накладную",
        visible: false,
      },
      productwaybill: {
        name_ru: "Добавить товарную накладную",
        visible: false,
      },
    };

    this._selectedCategory = "";
    this._selectedSuppliers = "";
    this._selectedPointIssue = "";
    this._selectedInvoice = "";
    this._selectedProduct = "";

    makeAutoObservable(this);
  }

  setDropDownMenuSelectItem(store, value) {
    switch (store) {
      case "categories":
        return this.setSelectedCategories(value);

      case "suppliers":
        return this.setSelectedSuppliers(value);

      case "pointIssue":
        return this.setSelectedPointIssue(value);

      case "invoice":
        return this.setSelectedInvoice(value);

      case "product":
        return this.setSelectedProduct(value);

      default:
        return null;
    }
  }

  setNameTable(name, key, value) {
    this._nameTable[name][key] = value;
  }

  setSelectedCategories(category) {
    this._selectedCategory = category;
  }
  setSelectedSuppliers(suppliers) {
    this._selectedSuppliers = suppliers;
  }
  setSelectedPointIssue(pointIssue) {
    this._selectedPointIssue = pointIssue;
  }
  setSelectedInvoice(invoice) {
    this._selectedInvoice = invoice;
  }
  setSelectedProduct(product) {
    this._selectedProduct = product;
  }

  getDropDownMenuSelectItem(store) {
    switch (store) {
      case "categories":
        return this.selectedCategory;

      case "suppliers":
        return this.selectedSuppliers;

      case "pointIssue":
        return this.selectedPointIssue;

      case "invoice":
        return this.selectedInvoice;

      case "product":
        return this.selectedProduct;

      default:
        return null;
    }
  }

  get nameTable() {
    return this._nameTable;
  }

  get selectedCategory() {
    return this._selectedCategory;
  }
  get selectedSuppliers() {
    return this._selectedSuppliers;
  }
  get selectedPointIssue() {
    return this._selectedPointIssue;
  }
  get selectedInvoice() {
    return this._selectedInvoice;
  }
  get selectedProduct() {
    return this._selectedProduct;
  }
}

import { makeAutoObservable } from "mobx";

import {
  deletedRow,
  getClient_discount_search,
  getDataUser_discount,
  searchData,
  sortData,
  sortData_search,
} from "../http/GetDataTableAPI";

import { toast } from "react-toastify";
import { TOAST_ERROR, TOAST_SUCCESS } from "../utils/params_toast";

import {
  CATEGORY_NAMECOLUMNE,
  CLIENT_NAMECOLUMNE,
  CREDENTIALS_NAMECOLUMNE,
  INVOICE_NAMECOLUMNE,
  POINTISSUE_NAMECOLUMNE,
  PRODUCTINFO_NAMECOLUMNE,
  PRODUCTWAYBILL_NAMECOLUMNE,
  PRODUCT_NAMECOLUMNE,
  SALESARCHIVE_NAMECOLUMNE,
  SALE_NAMECOLUMNE,
  SUPPLIERS_NAMECOLUMNE,
} from "../utils/consts_nameColumnE";

export default class DataTableStore {
  constructor() {
    this._dataUser = [];
    this._dataCredentials = [];
    this._dataSale = [];
    this._dataSalesArchive = [];
    this._dataProduct = [];
    this._dataProductInfo = [];
    this._dataCategory = [];
    this._dataPointIssue = [];
    this._dataSuppliers = [];
    this._dataInvoice = [];
    this._dataProductWaybill = [];

    //delete
    this._selectedInputs = [];
    this._countDeleteRow = 0;

    //search
    this._selectOption = "";
    this._valueSearchData = "";

    //sort
    this._sortColumnIndex = 0;
    this._sortMethod = "ASC";

    //на какой таблице пользовать находится
    this._activeTable = "";

    makeAutoObservable(this);
  }

  // обновление данных таблиц без параметров - дополнительная функция
  refreshDontParams(array, nameSort, saveDateResult) {
    array.map((item, index) =>
      this._sortColumnIndex === index
        ? sortData(nameSort, item, this._sortMethod).then((data) => {
            if (data.err || data.sqlMessage)
              return toast.error(data.err || data.sqlMessage, TOAST_ERROR);
            else saveDateResult(data);
          })
        : null
    );
  }

  // обновление данных таблиц с параметрами - дополнительная функция
  refreshWithParams(array, nameSort, saveDateResult) {
    array.map((item, index) =>
      this._sortColumnIndex === index
        ? sortData_search(
            nameSort,
            this._selectOption,
            this._valueSearchData,
            item,
            this._sortMethod
          ).then((data) => {
            if (data.err || data.sqlMessage)
              return toast.error(data.err || data.sqlMessage, TOAST_ERROR);
            else saveDateResult(data);
          })
        : null
    );
  }

  auxiliary_refresh(array, nameTable, funcSave) {
    if (this._valueSearchData === "" || this._selectOption === "")
      this.refreshDontParams(array, nameTable, funcSave.bind(this));
    else this.refreshWithParams(array, nameTable, funcSave.bind(this));
  }

  // обновляет таблицы
  refresh() {
    switch (this._activeTable) {
      case "CLIENT_NAMECOLUMNE": {
        if (this._valueSearchData === "" || this._selectOption === "") {
          CLIENT_NAMECOLUMNE.map((item, index) =>
            this._sortColumnIndex === index
              ? getDataUser_discount(item, this._sortMethod).then((data) => {
                  if (data.err || data.sqlMessage)
                    return toast.error(
                      data.err || data.sqlMessage,
                      TOAST_ERROR
                    );
                  else this.setDataUser(data);
                })
              : null
          );
        } else {
          CLIENT_NAMECOLUMNE.map((item, index) =>
            this._sortColumnIndex === index
              ? getClient_discount_search(
                  this._selectOption,
                  this._valueSearchData,
                  item,
                  this._sortMethod
                ).then((data) => {
                  if (data.err || data.sqlMessage)
                    return toast.error(
                      data.err || data.sqlMessage,
                      TOAST_ERROR
                    );
                  else this.setDataUser(data);
                })
              : null
          );
        }

        return null;
      }
      case "CREDENTIALS_NAMECOLUMNE":
        return this.auxiliary_refresh(
          CREDENTIALS_NAMECOLUMNE,
          "credentials",
          this.setDataCredentials
        );

      case "SALE_NAMECOLUMNE":
        return this.auxiliary_refresh(
          SALE_NAMECOLUMNE,
          "sale",
          this.setDataSale
        );
      case "SALESARCHIVE_NAMECOLUMNE":
        return this.auxiliary_refresh(
          SALESARCHIVE_NAMECOLUMNE,
          "salesarchive",
          this.setDataSalesArchive
        );
      case "PRODUCT_NAMECOLUMNE":
        return this.auxiliary_refresh(
          PRODUCT_NAMECOLUMNE,
          "product",
          this.setDataProduct
        );
      case "PRODUCTINFO_NAMECOLUMNE":
        return this.auxiliary_refresh(
          PRODUCTINFO_NAMECOLUMNE,
          "product_info",
          this.setDataProductInfo
        );
      case "CATEGORY_NAMECOLUMNE":
        return this.auxiliary_refresh(
          CATEGORY_NAMECOLUMNE,
          "category",
          this.setDataCategory
        );
      case "POINTISSUE_NAMECOLUMNE":
        return this.auxiliary_refresh(
          POINTISSUE_NAMECOLUMNE,
          "pointIssue",
          this.setDataPointIssue
        );
      case "SUPPLIERS_NAMECOLUMNE":
        return this.auxiliary_refresh(
          SUPPLIERS_NAMECOLUMNE,
          "suppliers",
          this.setDataSuppliers
        );
      case "INVOICE_NAMECOLUMNE":
        return this.auxiliary_refresh(
          INVOICE_NAMECOLUMNE,
          "invoice",
          this.setDataInvoice
        );
      case "PRODUCTWAYBILL_NAMECOLUMNE":
        return this.auxiliary_refresh(
          PRODUCTWAYBILL_NAMECOLUMNE,
          "productWaybill",
          this.setDataProductWaybill
        );

      default:
        return null;
    }
  }

  //указывает метод сортировки
  nameSortColumn(index) {
    this.setSortMethod(this._sortMethod === "ASC" ? "DESC" : "ASC");
    if (this._sortColumnIndex !== index) this.setSortMethod("ASC");

    this.setSortColumnIndex(index);
  }

  // выбрать одну строку
  checkedInputOne(id) {
    if (this._selectedInputs.length === 0) return this.setSelectedInputs(id);

    const repeatedValue = this._selectedInputs.filter((elem) => elem === id);

    if (repeatedValue.length > 0) {
      return this.deleteSelectedInputs(repeatedValue[0]);
    }
    this.setSelectedInputs(id);
  }

  // выбрать все строки - дополнительная функция
  auxiliary_checkedInputAll(dataName, dataIdName) {
    if (this._selectedInputs.length === dataName.length)
      return dataName.map((nameColumn) =>
        this.deleteSelectedInputs(nameColumn[dataIdName])
      );

    if (this._selectedInputs.length === 0)
      return dataName.map((nameColumn) =>
        this.setSelectedInputs(nameColumn[dataIdName])
      );

    dataName.map((nameColumn) =>
      this.deleteSelectedInputs(nameColumn[dataIdName])
    );
  }

  // выбрать все строки
  checkedInputAll() {
    switch (this._activeTable) {
      case "CLIENT_NAMECOLUMNE":
        return this.auxiliary_checkedInputAll(this._dataUser, "idClient");

      case "CREDENTIALS_NAMECOLUMNE":
        return this.auxiliary_checkedInputAll(
          this._dataCredentials,
          "idCredentials"
        );

      case "SALE_NAMECOLUMNE":
        return this.auxiliary_checkedInputAll(this._dataSale, "idSale");

      case "SALESARCHIVE_NAMECOLUMNE":
        return this.auxiliary_checkedInputAll(
          this._dataSalesArchive,
          "idSalesArchive"
        );

      case "PRODUCT_NAMECOLUMNE":
        return this.auxiliary_checkedInputAll(this._dataProduct, "idProduct");

      case "PRODUCTINFO_NAMECOLUMNE":
        return this.auxiliary_checkedInputAll(
          this._dataProductInfo,
          "idProductInfo"
        );

      case "CATEGORY_NAMECOLUMNE":
        return this.auxiliary_checkedInputAll(this._dataCategory, "idCategory");

      case "POINTISSUE_NAMECOLUMNE":
        return this.auxiliary_checkedInputAll(
          this._dataPointIssue,
          "idPointIssue"
        );

      case "SUPPLIERS_NAMECOLUMNE":
        return this.auxiliary_checkedInputAll(
          this._dataSuppliers,
          "idSuppliers"
        );

      case "INVOICE_NAMECOLUMNE":
        return this.auxiliary_checkedInputAll(this._dataInvoice, "idInvoice");

      case "PRODUCTWAYBILL_NAMECOLUMNE":
        return this.auxiliary_checkedInputAll(
          this._dataProductWaybill,
          "idProductWaybill"
        );

      default:
        return null;
    }
  }

  //   поиск по таблице - дополнительная функция
  auxiliary_searchData_change(values, nameColumn, setDataFunction) {
    if (this._selectOption === "") return null;

    this.setValueSearchData(values);

    setTimeout(() => {
      searchData(nameColumn, this._selectOption, this._valueSearchData).then(
        (data) => {
          setDataFunction(data);
          this.setSelectedInputs([]);
        }
      );
    }, 600);
  }

  //   поиск по таблице
  searchData_change(values) {
    switch (this._activeTable) {
      case "CLIENT_NAMECOLUMNE": {
        this.setValueSearchData(values);

        setTimeout(() => {
          CLIENT_NAMECOLUMNE.map((item, index) =>
            getClient_discount_search(
              this._selectOption,
              this._valueSearchData,
              this._sortColumnIndex === index ? item : "idClient",
              this.sortMethod
            ).then((data) => {
              if (data.err) {
                getDataUser_discount("idClient", "ASC").then((data) =>
                  this.setDataUser(data)
                );
                this.setSelectedInputs([]);

                return;
              }

              this.setDataUser(data);
              this.setSelectedInputs([]);
            })
          );
        }, 600);

        return null;
      }
      case "CREDENTIALS_NAMECOLUMNE":
        return this.auxiliary_searchData_change(
          values,
          "credentials",
          this.setDataCredentials.bind(this)
        );
      case "SALE_NAMECOLUMNE":
        return this.auxiliary_searchData_change(
          values,
          "sale",
          this.setDataSale.bind(this)
        );
      case "SALESARCHIVE_NAMECOLUMNE":
        return this.auxiliary_searchData_change(
          values,
          "salesArchive",
          this.setDataSalesArchive.bind(this)
        );
      case "PRODUCT_NAMECOLUMNE":
        return this.auxiliary_searchData_change(
          values,
          "product",
          this.setDataProduct.bind(this)
        );
      case "PRODUCTINFO_NAMECOLUMNE":
        return this.auxiliary_searchData_change(
          values,
          "product_info",
          this.setDataProductInfo.bind(this)
        );
      case "CATEGORY_NAMECOLUMNE":
        return this.auxiliary_searchData_change(
          values,
          "category",
          this.setDataCategory.bind(this)
        );
      case "POINTISSUE_NAMECOLUMNE":
        return this.auxiliary_searchData_change(
          values,
          "pointIssue",
          this.setDataPointIssue.bind(this)
        );
      case "SUPPLIERS_NAMECOLUMNE":
        return this.auxiliary_searchData_change(
          values,
          "suppliers",
          this.setDataSuppliers.bind(this)
        );
      case "INVOICE_NAMECOLUMNE":
        return this.auxiliary_searchData_change(
          values,
          "invoice",
          this.setDataInvoice.bind(this)
        );
      case "PRODUCTWAYBILL_NAMECOLUMNE":
        return this.auxiliary_searchData_change(
          values,
          "productWaybill",
          this.setDataProductWaybill.bind(this)
        );

      default:
        return;
    }
  }

  auxiliary_deleteRow(nameTable, nameColumn) {
    this._selectedInputs.map((selectedInput, index) => {
      deletedRow(selectedInput, nameTable, nameColumn).then((data) =>
        data.err ? toast.error("Ошибка при удалении записи", TOAST_ERROR) : null
      );

      this.setCountDeleteRow(index + 1);

      return null;
    });

    if (this.countDeleteRow > 0)
      toast.success(`Запись удалена (${this.countDeleteRow})`, TOAST_SUCCESS);

    this.refresh();
  }

  deleteRow() {
    switch (this._activeTable) {
      case "CLIENT_NAMECOLUMNE":
        return this.auxiliary_deleteRow("client", "idClient");
      case "CREDENTIALS_NAMECOLUMNE":
        return this.auxiliary_deleteRow("credentials", "idCredentials");
      case "SALE_NAMECOLUMNE":
        return this.auxiliary_deleteRow("sale", "idSale");
      case "SALESARCHIVE_NAMECOLUMNE":
        return this.auxiliary_deleteRow("salesArchive", "idSalesArchive");
      case "PRODUCT_NAMECOLUMNE":
        return this.auxiliary_deleteRow("product", "idProduct");
      case "PRODUCTINFO_NAMECOLUMNE":
        return this.auxiliary_deleteRow("product_info", "idProductInfo");
      case "CATEGORY_NAMECOLUMNE":
        return this.auxiliary_deleteRow("category", "idCategory");
      case "POINTISSUE_NAMECOLUMNE":
        return this.auxiliary_deleteRow("pointIssue", "idPointIssue");
      case "SUPPLIERS_NAMECOLUMNE":
        return this.auxiliary_deleteRow("suppliers", "idSuppliers");
      case "INVOICE_NAMECOLUMNE":
        return this.auxiliary_deleteRow("invoice", "idInvoice");
      case "PRODUCTWAYBILL_NAMECOLUMNE":
        return this.auxiliary_deleteRow("productWaybill", "idProductWaybill");

      default:
        return;
    }
  }

  dropDownMenuList(store) {
    switch (store) {
      case "categories":
        return this.dataCategory;

      case "suppliers":
        return this.dataSuppliers;

      case "pointIssue":
        return this.dataPointIssue;

      case "invoice":
        return this.dataInvoice;

      case "product":
        return this.dataProduct;

      case "productwaybill":
        return this.dataProductWaybill;

      default:
        return null;
    }
  }

  setDataUser(data) {
    this._dataUser = data;
  }

  setDataCredentials(data) {
    this._dataCredentials = data;
  }

  setDataSale(data) {
    this._dataSale = data;
  }

  setDataSalesArchive(data) {
    this._dataSalesArchive = data;
  }

  setDataProduct(data) {
    this._dataProduct = data;
  }

  setDataProductInfo(data) {
    this._dataProductInfo = data;
  }

  setDataCategory(data) {
    this._dataCategory = data;
  }

  setDataPointIssue(data) {
    this._dataPointIssue = data;
  }

  setDataSuppliers(data) {
    this._dataSuppliers = data;
  }

  setDataInvoice(data) {
    this._dataInvoice = data;
  }

  setDataProductWaybill(data) {
    this._dataProductWaybill = data;
  }

  setSelectedInputs(id) {
    if (typeof id == "object") return (this._selectedInputs = []);
    else this._selectedInputs.push(id);
  }

  deleteSelectedInputs(id) {
    this._selectedInputs.map((selectedInput, index) =>
      selectedInput === id ? this._selectedInputs.splice(index, 1) : null
    );
  }

  setCountDeleteRow(count) {
    this._countDeleteRow = count;
  }

  setSelectOption(selectOption) {
    this._selectOption = selectOption;
  }

  setValueSearchData(value) {
    this._valueSearchData = value;
  }

  setSortColumnIndex(index) {
    this._sortColumnIndex = index;
  }

  setSortMethod(method) {
    this._sortMethod = method;
  }

  setActiveTable(table) {
    this._activeTable = table;
  }

  get dataUser() {
    return this._dataUser;
  }

  get dataCredentials() {
    return this._dataCredentials;
  }

  get dataSale() {
    return this._dataSale;
  }

  get dataSalesArchive() {
    return this._dataSalesArchive;
  }

  get dataProduct() {
    return this._dataProduct;
  }

  get dataProductInfo() {
    return this._dataProductInfo;
  }

  get dataCategory() {
    return this._dataCategory;
  }

  get dataPointIssue() {
    return this._dataPointIssue;
  }

  get dataSuppliers() {
    return this._dataSuppliers;
  }

  get dataInvoice() {
    return this._dataInvoice;
  }

  get dataProductWaybill() {
    return this._dataProductWaybill;
  }

  get selectedInputs() {
    return this._selectedInputs;
  }

  get countDeleteRow() {
    return this._countDeleteRow;
  }

  get selectOption() {
    return this._selectOption;
  }

  get valueSearchData() {
    return this._valueSearchData;
  }

  get sortColumnIndex() {
    return this._sortColumnIndex;
  }

  get sortMethod() {
    return this._sortMethod;
  }

  get activeTable() {
    return this._activeTable;
  }
}

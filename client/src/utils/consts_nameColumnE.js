export const ALLS_NAMECOLUMNE = {
  CLIENT_NAMECOLUMNE: [
    "idClient",
    "nameClient",
    "emailClient",
    "telephoneClient",
    "addressClient",
    "percentPromotionsUsers",
  ],
  CREDENTIALS_NAMECOLUMNE: [
    "idCredentials",
    "idClient",
    "loginClient",
    "passwordClient",
    "roleClient",
  ],
  SALE_NAMECOLUMNE: [
    "idSale",
    "idClient",
    "idProduct",
    "numberSale",
    "dataSale",
    "countProductSale",
    "countAllSale",
    "priceSale",
  ],
  SALESARCHIVE_NAMECOLUMNE: ["idSalesArchive", "idSale", "statusSalesArchive"],
  PRODUCT_NAMECOLUMNE: [
    "idProduct",
    "idCategory",
    "nameProduct",
    "priceProduct",
    "imgProduct",
  ],
  PRODUCTINFO_NAMECOLUMNE: ["idProductInfo", "idProduct", "descriptionProduct"],
  CATEGORY_NAMECOLUMNE: ["idCategory", "nameCategory"],
  POINTISSUE_NAMECOLUMNE: [
    "idPointIssue",
    "addressPointIssue",
    "workingHousePointIssue",
  ],
  SUPPLIERS_NAMECOLUMNE: ["idSuppliers", "nameSuppliers"],
  INVOICE_NAMECOLUMNE: [
    "idInvoice",
    "idSuppliers",
    "idPointIssue",
    "dateDeliveryInvoice",
    "countInvoice",
    "priceInvoice",
  ],
  PRODUCTWAYBILL_NAMECOLUMNE: [
    "idProductWaybill",
    "idInvoice",
    "idProduct",
    "countProduct_waybill",
  ],
};
export const CLIENT_NAMECOLUMNE = [
  "idClient",
  "nameClient",
  "emailClient",
  "telephoneClient",
  "addressClient",
  "percentPromotionsUsers",
];
export const CREDENTIALS_NAMECOLUMNE = [
  "idCredentials",
  "idClient",
  "loginClient",
  "passwordClient",
  "roleClient",
];
export const SALE_NAMECOLUMNE = [
  "idSale",
  "idClient",
  "idProduct",
  "dataSale",
  "countSale",
  "priceSale",
  "numberSale",
];
export const SALESARCHIVE_NAMECOLUMNE = [
  "idSalesArchive",
  "idSale",
  "statusSalesArchive",
];
export const PRODUCT_NAMECOLUMNE = [
  "idProduct",
  "idCategory",
  "nameProduct",
  "priceProduct",
  "countProduct",
  "imgProduct",
];
export const PRODUCTINFO_NAMECOLUMNE = [
  "idProductInfo",
  "idProduct",
  "descriptionProduct",
];
export const CATEGORY_NAMECOLUMNE = [
  "idCategory",
  "nameCategory",
  "imgCategory",
];
export const POINTISSUE_NAMECOLUMNE = [
  "idPointIssue",
  "addressPointIssue",
  "workingHousePointIssue",
];
export const SUPPLIERS_NAMECOLUMNE = ["idSuppliers", "nameSuppliers"];
export const INVOICE_NAMECOLUMNE = [
  "idInvoice",
  "idSuppliers",
  "idPointIssue",
  "dateDeliveryInvoice",
  "countInvoice",
  "priceInvoice",
];
export const PRODUCTWAYBILL_NAMECOLUMNE = [
  "idProductWaybill",
  "idInvoice",
  "idProduct",
  "countProduct_waybill",
];

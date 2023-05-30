import { observer } from "mobx-react-lite";

import ThHeadUniversal from "./ThHeadUniversal";

import { ALLS_NAMECOLUMNR } from "../../../utils/consts_nameColumnR";

const RenderUniversalHeadTables = observer(({ nameTable }) => {
  const matchingColumns = ALLS_NAMECOLUMNR[nameTable.slice(0, -1)];

  if (matchingColumns) {
    return matchingColumns.map((column, index) => (
      <ThHeadUniversal key={index} index={index} name={column} />
    ));
  }
  return null;
  //   switch (nameTable) {
  //     case "CREDENTIALS_NAMECOLUMNE":
  //       return CREDENTIALS_NAMECOLUMNR.map((nameColumn, index) => (
  //         <ThHeadUniversal key={index} index={index} name={nameColumn} />
  //       ));
  //     case "SALE_NAMECOLUMNE":
  //       return SALE_NAMECOLUMNR.map((nameColumn, index) => (
  //         <ThHeadUniversal key={index} index={index} name={nameColumn} />
  //       ));
  //     case "SALESARCHIVE_NAMECOLUMNE":
  //       return SALESARCHIVE_NAMECOLUMNR.map((nameColumn, index) => (
  //         <ThHeadUniversal key={index} index={index} name={nameColumn} />
  //       ));
  //     case "PRODUCT_NAMECOLUMNE":
  //       return PRODUCT_NAMECOLUMNR.map((nameColumn, index) => (
  //         <ThHeadUniversal key={index} index={index} name={nameColumn} />
  //       ));
  //     case "PRODUCTINFO_NAMECOLUMNE":
  //       return PRODUCTINFO_NAMECOLUMNR.map((nameColumn, index) => (
  //         <ThHeadUniversal key={index} index={index} name={nameColumn} />
  //       ));
  //     case "CATEGORY_NAMECOLUMNE":
  //       return CATEGORY_NAMECOLUMNR.map((nameColumn, index) => (
  //         <ThHeadUniversal key={index} index={index} name={nameColumn} />
  //       ));
  //     case "POINTISSUE_NAMECOLUMNE":
  //       return POINTISSUE_NAMECOLUMNR.map((nameColumn, index) => (
  //         <ThHeadUniversal key={index} index={index} name={nameColumn} />
  //       ));
  //     case "SUPPLIERS_NAMECOLUMNE":
  //       return SUPPLIERS_NAMECOLUMNR.map((nameColumn, index) => (
  //         <ThHeadUniversal key={index} index={index} name={nameColumn} />
  //       ));
  //     case "INVOICE_NAMECOLUMNE":
  //       return INVOICE_NAMECOLUMNR.map((nameColumn, index) => (
  //         <ThHeadUniversal key={index} index={index} name={nameColumn} />
  //       ));
  //     case "PRODUCTWAYBILL_NAMECOLUMNE":
  //       return PRODUCTWAYBILL_NAMECOLUMNR.map((nameColumn, index) => (
  //         <ThHeadUniversal key={index} index={index} name={nameColumn} />
  //       ));

  //     default:
  //       return null;
  //   }
});

export default RenderUniversalHeadTables;

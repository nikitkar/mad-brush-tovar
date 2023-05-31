import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../../../index";

const CheckedAll = observer(({ nameTable }) => {
  const { dataTables } = useContext(Context);

  const checkLength = (storageCheck) => (
    <>
      {storageCheck.length === 0 ? (
        <svg
          className={
            "datagrid-thead-input-icon  datagrid-thead-input-icon_checked"
          }
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="CheckBoxOutlineBlankIcon"
        >
          <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
        </svg>
      ) : storageCheck.length === dataTables.selectedInputs.length ? (
        <svg
          className={
            "datagrid-thead-input-icon  datagrid-thead-input-icon_checked"
          }
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="CheckBoxOutlineBlankIcon"
        >
          <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
        </svg>
      ) : (
        <svg
          className="datagrid-thead-input-icon"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="CheckBoxIcon"
        >
          <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
        </svg>
      )}
    </>
  );

  switch (nameTable) {
    case "CLIENT_NAMECOLUMNE":
      return checkLength(dataTables.dataUser);

    case "CREDENTIALS_NAMECOLUMNE":
      return checkLength(dataTables.dataCredentials);

    case "SALE_NAMECOLUMNE":
      return checkLength(dataTables.dataSale);

    case "SALESARCHIVE_NAMECOLUMNE":
      return checkLength(dataTables.dataSalesArchive);

    case "PRODUCT_NAMECOLUMNE":
      return checkLength(dataTables.dataProduct);

    case "PRODUCTINFO_NAMECOLUMNE":
      return checkLength(dataTables.dataProductInfo);

    case "CATEGORY_NAMECOLUMNE":
      return checkLength(dataTables.dataCategory);

    case "POINTISSUE_NAMECOLUMNE":
      return checkLength(dataTables.dataPointIssue);

    case "SUPPLIERS_NAMECOLUMNE":
      return checkLength(dataTables.dataSuppliers);

    case "INVOICE_NAMECOLUMNE":
      return checkLength(dataTables.dataInvoice);

    case "PRODUCTWAYBILL_NAMECOLUMNE":
      return checkLength(dataTables.dataProductWaybill);

    default:
      return null;
  }
});

export default CheckedAll;

import { useContext } from "react";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";

import { Context } from "../../../index";

import { ALLS_NAMECOLUMNE } from "../../../utils/consts_nameColumnE";

const RenderUniversalBodyTables = observer(({ nameTable }) => {
  const { dataTables } = useContext(Context);

  const renderColumns = (objectData, nameTables) => {
    const matchingColumns = ALLS_NAMECOLUMNE[nameTables];

    if (matchingColumns) {
      return (
        <>
          <td className="datagrid-tbody-cell">
            <span
              className="datagrid-thead-input-wrap"
              onClick={() =>
                dataTables.checkedInputOne(Object.values(objectData)[0])
              }
            >
              <input className="datagrid-thead-input" type="checkbox" />
              {dataTables.selectedInputs.includes(
                Object.values(objectData)[0]
              ) ? (
                <svg
                  className="datagrid-thead-input-icon  datagrid-thead-input-icon_checked"
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
                  data-testid="CheckBoxOutlineBlankIcon"
                >
                  <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
                </svg>
              )}
              <span className="datagrid-thead-input-root"></span>
            </span>
          </td>
          {matchingColumns.map((column, index) => (
            <td className="datagrid-tbody-cell" key={index}>
              {objectData[column]}
            </td>
          ))}
        </>
      );
    }
    return null;
  };

  const renderRows = (array) => {
    runInAction(() => dataTables.setActiveTable(nameTable));

    return (
      <>
        {dataTables[array].map((nameColumn, index) => (
          <tr className="datagrid-tbody-row" key={index}>
            {renderColumns(nameColumn, nameTable)}
          </tr>
        ))}
      </>
    );
  };

  const renderTr = () => {
    switch (nameTable) {
      case "CREDENTIALS_NAMECOLUMNE":
        return renderRows("dataCredentials");
      case "SALE_NAMECOLUMNE":
        return renderRows("dataSale");
      case "SALESARCHIVE_NAMECOLUMNE":
        return renderRows("dataSalesArchive");
      case "PRODUCT_NAMECOLUMNE":
        return renderRows("dataProduct");
      case "PRODUCTINFO_NAMECOLUMNE":
        return renderRows("dataProductInfo");
      case "CATEGORY_NAMECOLUMNE":
        return renderRows("dataCategory");
      case "POINTISSUE_NAMECOLUMNE":
        return renderRows("dataPointIssue");
      case "SUPPLIERS_NAMECOLUMNE":
        return renderRows("dataSuppliers");
      case "INVOICE_NAMECOLUMNE":
        return renderRows("dataInvoice");
      case "PRODUCTWAYBILL_NAMECOLUMNE":
        return renderRows("dataProductWaybill");

      default:
        return null;
    }
  };

  return <tbody>{renderTr()}</tbody>;
});

export default RenderUniversalBodyTables;

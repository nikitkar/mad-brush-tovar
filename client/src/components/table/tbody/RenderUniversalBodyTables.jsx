import { useContext } from "react";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";

import { Context } from "../../../index";

import { ALLS_NAMECOLUMNE } from "../../../utils/consts_nameColumnE";

const RenderUniversalBodyTables = observer(({ nameTable }) => {
  const { dataTables, editDataRow } = useContext(Context);

  const renderColumns = (objectData, nameTables) => {
    const matchingColumns = ALLS_NAMECOLUMNE[nameTables];

    if (matchingColumns) {
      return (
        <>
          <td className="datagrid-tbody-cell datagrid-tbody-cell_checkbox">
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

            <span
              className="datagrid-thead-input-wrap  datagrid-thead-input-wrap_edit"
              onClick={() => {
                editDataRow.setIdRowEdit(Object.values(objectData)[0]);
                editDataRow.setVisibleModal(true);
              }}
            >
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="21px"
                height="21px"
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  fill="rgba(26, 26, 37, 0.2)"
                  stroke="none"
                >
                  <path
                    d="M4485 5110 c-73 -15 -154 -51 -212 -95 -32 -23 -125 -111 -208 -194
l-150 -151 378 -377 377 -378 160 160 c179 179 220 232 256 331 71 196 24 406
-125 555 -127 127 -306 183 -476 149z"
                  />
                  <path
                    d="M2833 3588 c-685 -686 -853 -860 -861 -888 -5 -19 -42 -201 -82 -405
-49 -246 -71 -379 -67 -398 9 -35 39 -65 74 -74 38 -9 801 143 840 167 15 10
406 396 868 859 l840 841 -375 375 c-206 206 -377 375 -380 375 -3 0 -388
-384 -857 -852z"
                  />
                  <path
                    d="M545 4259 c-203 -30 -388 -166 -479 -354 -70 -143 -66 -44 -66 -1772
0 -1740 -4 -1631 72 -1783 73 -145 203 -257 370 -318 l73 -27 1615 0 1615 0
80 27 c207 70 361 234 422 449 17 60 18 125 18 995 l0 931 -30 48 c-44 71
-118 109 -198 102 -70 -6 -125 -39 -164 -99 l-28 -42 -5 -920 c-5 -842 -6
-924 -22 -952 -24 -44 -81 -91 -125 -104 -27 -8 -490 -10 -1584 -8 l-1546 3
-39 27 c-21 15 -50 44 -64 65 l-25 37 -3 1558 c-2 1519 -2 1559 17 1596 11 20
32 49 48 64 63 61 19 58 989 58 673 0 897 3 928 12 57 17 119 82 135 141 27
95 -13 195 -97 244 l-47 28 -900 1 c-495 1 -927 -2 -960 -7z"
                  />
                </g>
              </svg>
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
        {dataTables[array].map((nameColumn, index) => {
          return (
            <tr className="datagrid-tbody-row" key={index}>
              {renderColumns(nameColumn, nameTable)}
            </tr>
          );
        })}
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

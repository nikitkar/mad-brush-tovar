import { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Confirm } from "semantic-ui-react";

import { Context } from "../index";

import RenderTables from "../components/table/function/RenderTables";
import RenderSelectOption from "../components/table/function/RenderSelectOption";
import { BtnAddingData } from "../components/table/function/BtnAddingData";
import { RenderModalAdd } from "../components/table/function/RenderModalAdd";
import { EditModalRow } from "../components/table/function/EditModalRow";

const TablesPage = observer(({ nameTable }) => {
  const { dataTables, editDataRow } = useContext(Context);

  const nameTabel_split = nameTable.split("_")[0].toLowerCase();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const deleteRow = () => {
    dataTables.deleteRow();
    closeDeleteModal();
  };

  useEffect(() => {
    dataTables.refresh();
    dataTables.setSelectedInputs([]);
  }, [dataTables]);

  return (
    <div className="mui-main">
      <div className="mui-toolbar">
        {nameTable === "" ? null : (
          <>
            {dataTables.selectedInputs.length === 0 ? null : (
              <>
                <div className="mui-toolbar-delete-wrap">
                  <p className="mui-toolbar-delete-text">
                    Элементов выделено -{" "}
                    <span>{dataTables.selectedInputs.length}</span>
                  </p>
                  <button className="btn-text" onClick={openDeleteModal}>
                    Удалить
                  </button>
                  <Confirm
                    content="Уверены, что хотите удалить?"
                    open={deleteModalOpen}
                    onCancel={closeDeleteModal}
                    onConfirm={deleteRow}
                  />
                </div>
              </>
            )}

            <BtnAddingData nameTabel_split={nameTabel_split} />

            <div className="mui-toolbar-search-wrap">
              <div className="mui-toolbar-search-column">
                <label className="mui-toolbar-search-label">
                  Поиск по столбцу -
                </label>
                <RenderSelectOption nameTable={nameTable} />
              </div>
              <input
                className="mui-toolbar-search-input"
                type="text"
                placeholder="Поиск"
                value={dataTables.valueSearchData}
                onChange={(e) => dataTables.searchData_change(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
      <div className="mui-paper">
        <div className="mui-paper-data_grid">
          <table className="datagrid-table">
            {nameTable === "" ? null : <RenderTables nameTable={nameTable} />}
          </table>
        </div>

        <RenderModalAdd />
        <EditModalRow stateModal={editDataRow.visibleModal} />
      </div>
    </div>
  );
});

export default TablesPage;

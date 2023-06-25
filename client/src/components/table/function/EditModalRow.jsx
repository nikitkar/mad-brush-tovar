/* eslint-disable array-callback-return */
import { useCallback, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../../../index";

import { ALLS_NAMECOLUMNR } from "../../../utils/consts_nameColumnR";

import { editData } from "../../../http/GetDataTableAPI";
import { toast } from "react-toastify";
import { TOAST_ERROR, TOAST_SUCCESS } from "../../../utils/params_toast";

export const EditModalRow = observer(({ stateModal }) => {
  const { dataTables, editDataRow } = useContext(Context);

  const [classModal, setClassModal] = useState("editModal");
  const [dataTextarea, setDataTextarea] = useState([]);
  const [idColunmValue, setIdColumnValue] = useState(0);

  const handleInputChangeDataTextarea = useCallback(
    (e, index) => {
      const newData = [...dataTextarea];
      newData[index].value = e.target.value;

      setDataTextarea(newData);
    },
    [dataTextarea]
  );

  useEffect(() => {
    setClassModal(stateModal ? "editModal is_active" : "editModal");

    dataTables.getNeedArrayForEdingData().data.map((arrayData) => {
      if (Object.values(arrayData)[0] === editDataRow.idRowEdit) {
        return Object.entries(arrayData).map((item, index) => {
          if (index === 0) setIdColumnValue(item);

          setDataTextarea((prevData) => [
            ...prevData,
            { key: item[0], value: item[1] },
          ]);
        });
      }
    });

    return () => setDataTextarea(() => []);
  }, [editDataRow, dataTables, stateModal]);

  const onClose = () => editDataRow.setVisibleModal(false);
  const saveInfo = () => {
    let dataArr = [];
    dataTextarea.map((item, index) => {
      if (index !== 0) dataArr.push(item?.key + " = '" + item?.value + "'");
    });

    editData(
      dataTables.getNeedArrayForEdingData().table,
      dataArr.join(", "),
      idColunmValue.join(" = ")
    ).then((data) => {
      if (data.err) return toast.error(data.err.sqlMessage, TOAST_ERROR);

      onClose();
      toast.success(data.message, TOAST_SUCCESS);
      dataTables.refresh();
    });
  };

  return (
    <div
      className={classModal}
      onClick={(e) => {
        const className = e.target.classList[0];

        if (className === "editModal" || className === "editModal-close")
          onClose();
      }}
    >
      <div className="editModal-body">
        <span className="editModal-close" onClick={() => onClose()}></span>

        <h4 className="editModal-title">Изменить данные</h4>

        <div className="editModal-form">
          {dataTables.getNeedArrayForEdingData().data.map((arrayData) => {
            if (Object.values(arrayData)[0] === editDataRow.idRowEdit) {
              return Object.entries(arrayData).map((item, index) => {
                return (
                  <div className="createProduct-box" key={index}>
                    <label className="createProduct-box__text">
                      {
                        ALLS_NAMECOLUMNR[
                          Object.keys(ALLS_NAMECOLUMNR).find(
                            (item) =>
                              item.split("_")[0] ===
                              dataTables.getNeedArrayForEdingData().table
                          )
                        ][index]
                      }
                    </label>
                    <textarea
                      readOnly={index === 0 ? true : false}
                      className="editModal-input  editModal-textarea"
                      value={dataTextarea[index]?.value}
                      onChange={(e) => handleInputChangeDataTextarea(e, index)}
                    />
                  </div>
                );
              });
            }

            return null;
          })}

          <input
            className="editModal-button btn-text"
            type="submit"
            value="Сохранить изменения"
            onClick={saveInfo}
          />
        </div>
      </div>
    </div>
  );
});

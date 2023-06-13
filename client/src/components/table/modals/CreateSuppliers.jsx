import { useContext, useEffect, useState } from "react";

import { Context } from "../../../index";

import { createSuppliers } from "../../../http/SuppliersAPI";
import { toast } from "react-toastify";
import { TOAST_ERROR, TOAST_SUCCESS } from "../../../utils/params_toast";

const CreateSuppliers = ({ stateModal, onClick }) => {
  const { dataTables } = useContext(Context);

  const [classModal, setClassModal] = useState("createSuppliers");
  const [value, setValue] = useState("");

  useEffect(
    () =>
      setClassModal(
        stateModal ? "createSuppliers is_active" : "createSuppliers"
      ),
    [stateModal]
  );

  const addSuppliers = () => {
    createSuppliers({ name: value }).then((data) => {
      if (data.err) return toast.error(data.err, TOAST_ERROR);

      setValue("");
      onClick();

      toast.success("Запись добавлена", TOAST_SUCCESS);
      dataTables.refresh();
    });
  };

  return (
    <div
      className={classModal}
      onClick={(e) => {
        const className = e.target.classList[0];

        if (
          className === "createSuppliers" ||
          className === "createSuppliers-close"
        )
          onClick();
      }}
    >
      <div className="createSuppliers-body">
        <span
          className="createSuppliers-close"
          onClick={() => onClick()}
        ></span>

        <h4 className="createSuppliers-title">Добавить поставщика</h4>

        <div className="createSuppliers-form">
          <input
            className="createSuppliers-input"
            type="text"
            placeholder="Введите название поставщика"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <input
            className="createSuppliers-button btn-text"
            type="submit"
            value="Добавить поставщика"
            onClick={addSuppliers}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateSuppliers;

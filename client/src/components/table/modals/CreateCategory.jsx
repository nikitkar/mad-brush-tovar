import { useContext, useEffect, useState } from "react";

import { Context } from "../../../index";

import { createCategory } from "../../../http/CategoryAPI";
import { toast } from "react-toastify";
import { TOAST_ERROR, TOAST_SUCCESS } from "../../../utils/params_toast";

const CreateCategory = ({ stateModal, onClick }) => {
  const { dataTables } = useContext(Context);

  const [classModal, setClassModal] = useState("createCategory");
  const [value, setValue] = useState("");

  useEffect(
    () =>
      setClassModal(stateModal ? "createCategory is_active" : "createCategory"),
    [stateModal]
  );

  const addCategory = () => {
    createCategory({ name: value }).then((data) => {
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
          className === "createCategory" ||
          className === "createCategory-close"
        )
          onClick();
      }}
    >
      <div className="createCategory-body">
        <span className="createCategory-close" onClick={() => onClick()}></span>

        <h4 className="createCategory-title">Добавить категорию</h4>

        <div className="createCategory-form">
          <input
            className="createCategory-input"
            type="text"
            placeholder="Введите название категории"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <input
            className="createCategory-button btn-text"
            type="submit"
            value="Добавить категорию"
            onClick={addCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;

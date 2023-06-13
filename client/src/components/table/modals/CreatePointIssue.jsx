import { useContext, useEffect, useState } from "react";

import { Context } from "../../../index";

import { createPointIssue } from "../../../http/PointIssueAPI";
import { toast } from "react-toastify";
import { TOAST_ERROR, TOAST_SUCCESS } from "../../../utils/params_toast";

const CreatePointIssue = ({ stateModal, onClick }) => {
  const { dataTables } = useContext(Context);

  const [classModal, setClassModal] = useState("createPointIssue");
  const [address, setAddress] = useState("");
  const [workingTime, setWorkingTime] = useState("");

  useEffect(
    () =>
      setClassModal(
        stateModal ? "createPointIssue is_active" : "createPointIssue"
      ),
    [stateModal]
  );

  const addPointIssue = () => {
    createPointIssue({ address: address, workingTime: workingTime }).then(
      (data) => {
        if (data.err) return toast.error(data.err, TOAST_ERROR);

        setAddress("");
        setWorkingTime("");

        toast.success("Запись добавлена", TOAST_SUCCESS);
        onClick();
        dataTables.refresh();
      }
    );
  };

  return (
    <div
      className={classModal}
      onClick={(e) => {
        const className = e.target.classList[0];

        if (
          className === "createPointIssue" ||
          className === "createPointIssue-close"
        )
          onClick();
      }}
    >
      <div className="createPointIssue-body">
        <span
          className="createPointIssue-close"
          onClick={() => onClick()}
        ></span>

        <h4 className="createPointIssue-title">Добавить пункт доставки</h4>

        <div className="createPointIssue-form">
          <input
            className="createPointIssue-input"
            type="text"
            placeholder="Введите адерс пункта доставки"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            className="createPointIssue-input"
            type="text"
            placeholder="Введите время работы пункта доставки"
            value={workingTime}
            onChange={(e) => setWorkingTime(e.target.value)}
          />

          <input
            className="createPointIssue-button btn-text"
            type="submit"
            value="Добавить пункт доставки"
            onClick={addPointIssue}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePointIssue;

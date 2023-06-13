import { useContext, useEffect, useState } from "react";

import { Context } from "../../../index";

import { createInvoice } from "../../../http/InvoiceAPI";
import { toast } from "react-toastify";
import { TOAST_ERROR, TOAST_SUCCESS } from "../../../utils/params_toast";
import DropDownMenu from "../../dropDownMenu/DropDownMenu";

const CreateInvoice = ({ stateModal, onClick }) => {
  const { dataTables, BtnAdding_VisibleModal } = useContext(Context);

  const [classModal, setClassModal] = useState("createInvoice");

  const [dateValue, setDateValue] = useState("");
  const [countValue, setCountValue] = useState("");
  const [priceValue, setPriceValue] = useState("");

  useEffect(
    () =>
      setClassModal(stateModal ? "createInvoice is_active" : "createInvoice"),
    [stateModal]
  );

  const addInvoice = () => {
    createInvoice({
      idSuppliers: dataTables.dataSuppliers.find(
        (item) =>
          item.nameSuppliers === BtnAdding_VisibleModal.selectedSuppliers
      )?.idSuppliers,
      idPointIssue: dataTables.dataPointIssue.find(
        (item) =>
          item.addressPointIssue === BtnAdding_VisibleModal.selectedPointIssue
      )?.idPointIssue,
      priceInvoice: priceValue,
      dateDeliveryInvoice: dateValue,
      countInvoice: countValue,
    }).then((data) => {
      if (data.err) return toast.error(data.err, TOAST_ERROR);

      setDateValue("");
      setCountValue("");
      setPriceValue("");

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
          className === "createInvoice" ||
          className === "createInvoice-close"
        )
          onClick();
      }}
    >
      <div className="createInvoice-body">
        <span className="createInvoice-close" onClick={() => onClick()}></span>

        <h4 className="createInvoice-title">Добавить накладную</h4>

        <div className="createInvoice-form">
          <DropDownMenu title="Выберите поставщика" store="suppliers" />
          <DropDownMenu title="Выберите пункт доставки" store="pointIssue" />

          <input
            className="createInvoice-input"
            type="date"
            placeholder="Введите дату оформления (ГГГГ.ММ.ДД)"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
          />
          <input
            className="createInvoice-input"
            type="number"
            placeholder="Введите количество товара"
            value={countValue}
            onChange={(e) => setCountValue(e.target.value)}
          />
          <input
            className="createInvoice-input"
            type="text"
            placeholder="Введите итоговую сумма накладной"
            value={priceValue}
            onChange={(e) => setPriceValue(e.target.value)}
          />

          <input
            className="createInvoice-button btn-text"
            type="submit"
            value="Добавить накладную"
            onClick={addInvoice}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;

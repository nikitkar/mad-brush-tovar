import { useContext, useEffect, useState } from "react";

import { Context } from "../../../index";

import { createProductWaybill } from "../../../http/ProductWaybillAPI";
import { toast } from "react-toastify";
import { TOAST_ERROR, TOAST_SUCCESS } from "../../../utils/params_toast";
import DropDownMenu from "../../dropDownMenu/DropDownMenu";

const CreateProductWaybill = ({ stateModal, onClick }) => {
  const { dataTables, BtnAdding_VisibleModal } = useContext(Context);

  const [classModal, setClassModal] = useState("createProductWaybill");
  const [countProduct_waybill, setCountProduct_waybill] = useState("");

  useEffect(
    () =>
      setClassModal(
        stateModal ? "createProductWaybill is_active" : "createProductWaybill"
      ),
    [stateModal]
  );

  const addProductWaybill = () => {
    createProductWaybill({
      idInvice: dataTables.dataInvoice.find(
        (item) => item.idInvoice === BtnAdding_VisibleModal.selectedInvoice
      )?.idInvoice,
      idProduct: dataTables.dataProduct.find(
        (item) => item.idProduct === BtnAdding_VisibleModal.selectedProduct
      )?.idProducts,
      nameProduct_waybill: 0,
      countProduct_waybill: countProduct_waybill,
    }).then((data) => {
      if (data.err) return toast.error(data.err, TOAST_ERROR);

      setCountProduct_waybill("");

      toast.success("Запись добавлена", TOAST_SUCCESS);
      onClick();
      dataTables.refresh();
    });
  };

  return (
    <div
      className={classModal}
      onClick={(e) => {
        const className = e.target.classList[0];

        if (
          className === "createProductWaybill" ||
          className === "createProductWaybill-close"
        )
          onClick();
      }}
    >
      <div className="createProductWaybill-body">
        <span
          className="createProductWaybill-close"
          onClick={() => onClick()}
        ></span>

        <h4 className="createProductWaybill-title">
          Добавить товарную накладную
        </h4>

        <div className="createProductWaybill-form">
          <DropDownMenu title="Выберите номер накладной" store="invoice" />
          <DropDownMenu title="Выберите номер продукта" store="product" />
          <input
            className="createProductWaybill-input"
            type="number"
            placeholder="Введите количество продукции"
            value={countProduct_waybill}
            onChange={(e) => setCountProduct_waybill(e.target.value)}
          />

          <input
            className="createProductWaybill-button btn-text"
            type="submit"
            value="Добавить пункт доставки"
            onClick={addProductWaybill}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProductWaybill;

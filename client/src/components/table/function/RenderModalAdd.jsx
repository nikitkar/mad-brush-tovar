import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../../../index";

import CreateCategory from "../modals/CreateCategory";
import CreateProduct from "../modals/CreateProduct";
import CreatePointIssue from "../modals/CreatePointIssue";
import CreateSuppliers from "../modals/CreateSuppliers";
import CreateInvoice from "../modals/CreateInvoice";
import CreateProductWaybill from "../modals/CreateProductWaybill";

export const RenderModalAdd = observer(() => {
  const { BtnAdding_VisibleModal } = useContext(Context);

  const closeModalClick = (nameTable) =>
    BtnAdding_VisibleModal.setNameTable(nameTable, "visible", false);

  return (
    <>
      <CreateCategory
        stateModal={BtnAdding_VisibleModal?.nameTable?.category?.visible}
        onClick={() => closeModalClick("category")}
      />
      <CreateProduct
        stateModal={BtnAdding_VisibleModal?.nameTable?.product?.visible}
        onClick={() => closeModalClick("product")}
      />
      <CreatePointIssue
        stateModal={BtnAdding_VisibleModal?.nameTable?.pointissue?.visible}
        onClick={() => closeModalClick("pointissue")}
      />
      <CreateSuppliers
        stateModal={BtnAdding_VisibleModal?.nameTable?.suppliers?.visible}
        onClick={() => closeModalClick("suppliers")}
      />
      <CreateInvoice
        stateModal={BtnAdding_VisibleModal?.nameTable?.invoice?.visible}
        onClick={() => closeModalClick("invoice")}
      />
      <CreateProductWaybill
        stateModal={BtnAdding_VisibleModal?.nameTable?.productwaybill?.visible}
        onClick={() => closeModalClick("productwaybill")}
      />
    </>
  );
});

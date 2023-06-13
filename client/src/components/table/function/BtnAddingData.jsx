import React, { useContext, useEffect, useState } from "react";

import { observer } from "mobx-react-lite";

import { Context } from "../../../index";

export const BtnAddingData = observer(({ nameTabel_split }) => {
  const { BtnAdding_VisibleModal } = useContext(Context);
  const [contentBtn, setContentBtn] = useState("");

  const addRow = () =>
    BtnAdding_VisibleModal.setNameTable(nameTabel_split, "visible", true);

  useEffect(
    () =>
      setContentBtn(BtnAdding_VisibleModal.nameTable[nameTabel_split]?.name_ru),
    [BtnAdding_VisibleModal.nameTable, nameTabel_split]
  );

  return (
    <>
      {contentBtn === "" || contentBtn === undefined ? null : (
        <button className="btn-text" onClick={() => addRow()}>
          {contentBtn}
        </button>
      )}
    </>
  );
});

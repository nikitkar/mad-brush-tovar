import { observer } from "mobx-react-lite";
import { useState, useContext } from "react";

import { Context } from "../../index";

const DropDownMenu = observer(({ title, store }) => {
  const { dataTables, BtnAdding_VisibleModal } = useContext(Context);

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="drop-down-wrap">
      <div
        className="drop-down  btn-text"
        onClick={() => setShowMenu(!showMenu)}
      >
        <p className="drop-down-title">{title}</p>

        <ul
          className={showMenu ? "drop-down-list  is_active" : "drop-down-list"}
        >
          {dataTables.dropDownMenuList(store).map((item, index) => (
            <li
              className="drop-down-item"
              key={index}
              onClick={() =>
                store === "invoice" || store === "product"
                  ? BtnAdding_VisibleModal.setDropDownMenuSelectItem(
                      store,
                      Object.values(item)[0]
                    )
                  : BtnAdding_VisibleModal.setDropDownMenuSelectItem(
                      store,
                      Object.values(item)[1]
                    )
              }
            >
              <p className="drop-down-item__title">
                {store === "invoice" || store === "product"
                  ? Object.values(item)[0]
                  : Object.values(item)[1]}
              </p>
            </li>
          ))}
          {BtnAdding_VisibleModal.getDropDownMenuSelectItem(store)}
        </ul>
      </div>
      <p className="drop-donw-selected">
        {BtnAdding_VisibleModal.getDropDownMenuSelectItem(store)}
      </p>
    </div>
  );
});

export default DropDownMenu;

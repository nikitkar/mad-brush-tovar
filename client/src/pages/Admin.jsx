import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../index";

import TablesPage from "./TablesPage";

import { getAll } from "../http/UserAPI";

import ToastContainers from "../utils/params_toast";
import { NAME_TABLES } from "../utils/consts_nameTables";

const Admin = observer(() => {
  const { user, dataTables } = useContext(Context);
  const [value, setValue] = useState("");
  const [nameTable, setNameTable] = useState("");

  useEffect(() => {
    getAll().then((data) => user.setAllUser(data));
  }, [user]);

  const setValueChange = (nametables) => {
    setValue(nametables);
    setNameTable(nametables);

    dataTables.setSelectedInputs([]);
    dataTables.setSelectOption("");
    dataTables.setValueSearchData("");
    dataTables.setSortMethod("ASC");
    dataTables.setSortColumnIndex(0);

    NAME_TABLES.map((nameTable) =>
      nametables === nameTable.name_en ? setNameTable(nameTable.name_ru) : null
    );
  };

  return (
    <section className="admins">
      <ToastContainers />
      <div className="container">
        <div className="admins-wrapper">
          <div className="admins-add">
            {NAME_TABLES.map((nameTable, index) => (
              <button
                className="admins-add__button  btn-text"
                onClick={() => setValueChange(nameTable.name_en)}
                key={index}
              >
                {nameTable.name_ru}
              </button>
            ))}
          </div>

          <p>
            {value === "Histogram" || value === "PieChart"
              ? "Вы находитесь на диаграмме - " + nameTable
              : value === ""
              ? null
              : "Вы находитесь на таблице - " + nameTable}
          </p>

          <div className="admins-body">
            <TablesPage nameTable={value} />
          </div>
        </div>
      </div>
    </section>
  );
});

export default Admin;

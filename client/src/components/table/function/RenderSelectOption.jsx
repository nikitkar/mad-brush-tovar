import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../../../index";

import { ALLS_NAMECOLUMNR } from "../../../utils/consts_nameColumnR";
import { ALLS_NAMECOLUMNE } from "../../../utils/consts_nameColumnE";

const RenderSelectOption = observer(({ nameTable }) => {
  const { dataTables } = useContext(Context);
  const matchingColumns = ALLS_NAMECOLUMNR[nameTable?.slice(0, -1)];

  const auxiliary_renderOption = () =>
    matchingColumns?.map((item, index) => (
      <option
        key={index}
        className="mui-toolbar-search-option"
        value={ALLS_NAMECOLUMNE[nameTable][index]}
      >
        {item}
      </option>
    ));

  return (
    <select
      className="mui-toolbar-search-select"
      name="mui-toolbar-search-select"
      value={dataTables.selectOption}
      onChange={(e) => dataTables.setSelectOption(e.target.value)}
    >
      <option></option>
      {auxiliary_renderOption()}
    </select>
  );
});

export default RenderSelectOption;

import { observer } from "mobx-react-lite";

import ThHeadUniversal from "./ThHeadUniversal";

import { ALLS_NAMECOLUMNR } from "../../../utils/consts_nameColumnR";

const RenderUniversalHeadTables = observer(({ nameTable }) => {
  const matchingColumns = ALLS_NAMECOLUMNR[nameTable.slice(0, -1)];

  if (matchingColumns) {
    return matchingColumns.map((column, index) => (
      <ThHeadUniversal key={index} index={index} name={column} />
    ));
  }
  return null;
});

export default RenderUniversalHeadTables;

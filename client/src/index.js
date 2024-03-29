import { createContext } from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";
import HeaderStore from "./store/HeaderStore";
import CategoriesByProductsStore from "./store/CategoriesByProducts";
import BasketStore from "./store/BasketStore";
import PromotionsUsersStore from "./store/PromotionsUsersStore";
import PointIssueStore from "./store/PointIssueStore";
import DataTableStore from "./store/DataTableStore";
import Table_BtnAddingData_VisibleModalStore from "./store/Table_BtnAddingData_VisibleModalStore";
import EditDataRowStore from "./store/EditDataRowStore";

export const Context = createContext(null);

// определение контекста данных и рендер страницы
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      products: new ProductStore(),
      productsAll: new ProductStore(),
      categories: new ProductStore(),
      isActiveHeader: new HeaderStore(),
      categoriesByProducts: new CategoriesByProductsStore(),
      basket: new BasketStore(),
      listPromotionsUsers: new PromotionsUsersStore(),
      listPointIssue: new PointIssueStore(),
      dataTables: new DataTableStore(),
      BtnAdding_VisibleModal: new Table_BtnAddingData_VisibleModalStore(),
      editDataRow: new EditDataRowStore(),
      authModal: true, // надо узнать что это такое
    }}
  >
    <App />
  </Context.Provider>
);

import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "./index";

import AppRouter from "./components/AppRouter";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";

import { check } from "./http/UserAPI";
import { fetchPointIssue } from "./http/PointIssueAPI";
import { fetchSuppliers } from "./http/SuppliersAPI";

import "./assets/sass/app.scss";
import { fetchInvoice } from "./http/InvoiceAPI";
import { fetchAllProduct } from "./http/ProductAPI";

const App = observer(() => {
  const { user, basket, dataTables } = useContext(Context);

  useEffect(() => {
    check().then((data) => {
      user.setUser(true);
      user.setIsAuth(true);
      user.setRole(data.role);
      user.setId(data.id);

      fetchPointIssue().then((data) => dataTables.setDataPointIssue(data));
      fetchSuppliers().then((data) => dataTables.setDataSuppliers(data));
      fetchInvoice().then((data) => dataTables.setDataInvoice(data));
      fetchAllProduct().then((data) => dataTables.setDataProduct(data));
    });

    basket.setListBasket(basket.localStorageListBasket);
  }, [basket, dataTables, user]);

  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <AppRouter />
      </main>
      <Footer />
    </BrowserRouter>
  );
});

export default App;

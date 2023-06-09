import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "../index";
import { LOGIN_ROUTE } from "../utils/consts";

import { createSale, getNumberSale } from "../http/SaleAPI";

import CheckoutAside from "../components/checkout/CheckoutAside";

import { toast } from "react-toastify";

import ToastContainers, {
  TOAST_ERROR,
  TOAST_SUCCESS,
} from "../utils/params_toast";

const Checkout = observer(() => {
  const { user, basket, listPromotionsUsers, listPointIssue } =
    useContext(Context);
  const [changeInput, setChangeInput] = useState(0);
  const [name, setName] = useState("");

  const onChangeInput = (e) => setChangeInput(e.target.id);
  const onChangeName = (e) => setName(e.target.value);

  const createSales = () => {
    if (name === "" || name == null) {
      toast.error("Некорректно введено имя!", TOAST_ERROR);
    } else {
      getNumberSale().then((data) => {
        const indexNumberSale = data[0]?.total;

        basket.listBasket.map((basketItem, indexBasket) =>
          createSale(
            user.id,
            basketItem.id,
            Number(
              basket.totalCost -
                basket.totalCost *
                  (listPromotionsUsers.percentPromotionsUsers / 100)
            ).toFixed(2),
            indexNumberSale + 1,
            basketItem.count,
            basket.quantityProducts
          ).then(
            (data) => {
              setName("");
              setChangeInput(0);
              basket.setListBasket([]);
              basket.setTotalCost(0);
            },
            (err) =>
              toast.error(
                "Ошибка заказа, обратитесь к администратору!\n\n" + err,
                TOAST_ERROR
              )
          )
        );

        toast.success("Заказ оформлен", TOAST_SUCCESS);
      });
    }
  };

  return (
    <section className="checkout">
      <ToastContainers />
      <div className="container">
        <div className="checkout-wrapper">
          <h3 className="checkout-title">Оформление заказа</h3>

          {user.isAuth ? (
            basket.quantityProducts === 0 ? (
              <p className="basket-body-message">Ваша корзина пуста</p>
            ) : (
              <div className="checkout-body">
                <div className="checkout-left">
                  <div className="personal-info">
                    <h3 className="checkout-heading-title">
                      Введите данные получателя заказа
                    </h3>

                    <div className="personal-info-wrap">
                      <p className="personal-info-text">Имя*</p>
                      <input
                        className="personal-info-input"
                        type="text"
                        placeholder="Имя"
                        onChange={(e) => onChangeName(e)}
                        value={name}
                      />
                    </div>
                  </div>

                  <div className="receiving">
                    <h3 className="checkout-heading-title">
                      Где хотите получить заказ?
                    </h3>

                    <div className="receiving-list">
                      {listPointIssue.listPointIssue.map(
                        (itemPointIssue, index) => (
                          <div className="receiving-item" key={index}>
                            <input
                              className="receiving-item__input"
                              type="radio"
                              id={index}
                              checked={
                                Number(changeInput) === index ? true : false
                              }
                              onChange={onChangeInput}
                            />
                            <label
                              className="receiving-item__label"
                              id={index}
                              onClick={onChangeInput}
                            >
                              {itemPointIssue.addressPointIssue}
                              <br />
                              <span>
                                {itemPointIssue.workingHousePointIssue}{" "}
                              </span>
                            </label>
                          </div>
                        )
                      )}

                      {/* <div className="receiving-item">
                        <input
                          className="receiving-item__input"
                          type="radio"
                          id={2}
                          checked={Number(changeInput) === 2 ? true : false}
                          onChange={onChangeInput}
                        />
                        <label
                          className="receiving-item__label"
                          id={2}
                          onClick={onChangeInput}>
                          ул. Корженевского, 26 (ТЦ "Корона", 1 этаж)
                        </label>
                      </div>
                      <div className="receiving-item">
                        <input
                          className="receiving-item__input"
                          type="radio"
                          id={3}
                          checked={Number(changeInput) === 3 ? true : false}
                          onChange={onChangeInput}
                        />
                        <label
                          className="receiving-item__label"
                          id={3}
                          onClick={onChangeInput}>
                          пр. Победителей 65/1 (ТЦ "Замок", 4 этаж)
                        </label>
                      </div> */}
                    </div>
                  </div>
                </div>

                <div className="checkout-right">
                  <CheckoutAside click={createSales} />
                </div>
              </div>
            )
          ) : (
            <>
              <p className="basket-error">
                Необходимо{" "}
                <Link to={LOGIN_ROUTE} className="basket-error-link">
                  авторизироваться
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
});

export default Checkout;

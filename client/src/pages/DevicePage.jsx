import { observer } from "mobx-react-lite";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { Context } from "../index";

import basketIcon from "../assets/images/icon/basket.svg";
import { fetchOneProduct } from "../http/ProductAPI";

import NotFound from "./NotFound";
import { toast } from "react-toastify";

import ToastContainers, { TOAST_SUCCESS } from "../utils/params_toast";

//обертка, для того, чтобы видеть измениня (подписка)
const DevicePage = observer(() => {
  const { basket } = useContext(Context);
  const [products, setProducts] = useState(null);
  const { id } = useParams();

  //сработает при первой загрузке страницы
  useEffect(() => {
    fetchOneProduct(id).then((data) => setProducts(data));
  }, [id]);

  const addItemBaskets = (idItem) => {
    basket.addItem(idItem);

    toast.success("Товар добавлен в корзину", TOAST_SUCCESS);
  };

  return (
    <section className="product">
      <ToastContainers />
      <div className="container">
        <div className="product-wrapper">
          {products?.product ? (
            <>
              <h2 className="product-title">
                {products?.product?.nameProduct}
              </h2>

              <div className="product-body">
                <div className="product-img-wrap">
                  <img
                    className="product-img"
                    src={
                      process.env.REACT_APP_API_URL +
                      "/" +
                      products?.product?.imgProduct
                    }
                    alt="Изображение товара"
                    width="560"
                    height="477"
                  />
                </div>

                <div className="product-info">
                  <ul className="product-params__list">
                    {products?.info.map((description, index) => (
                      <li className="product-params__item" key={index}>
                        {/* <h4 className="product-params__item-title">
                      {description.titleProduct}:
                    </h4> */}
                        <p
                          className="product-params__item-value"
                          dangerouslySetInnerHTML={{
                            __html: description.descriptionProduct,
                          }}
                        >
                          {/* {description.descriptionProduct} */}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="product-payment">
                    <div className="product-payment__coast">
                      <p className="product-payment__price">
                        {products?.product?.priceProduct} BYN
                      </p>
                    </div>
                    <div className="product-payment__controls">
                      <button
                        className="product-payment__controls-button  btn-icon"
                        type="button"
                        onClick={() => addItemBaskets(id)}
                      >
                        <span className="product-payment__controls_btn-icon  btn-icon_icon">
                          <img
                            className="product-payment__controls_btn-icon_img  btn-icon_icon-img"
                            src={basketIcon}
                            alt="В корзину"
                          />
                        </span>
                        <span className="product-payment__controls_btn-text  btn-icon-text">
                          В корзину
                        </span>
                      </button>
                    </div>

                    {/* блок с персональной скидкой */}
                    {/* <div className="product-payment__bonus">
                  {user.isAuth === true ? (
                    <p className="product-payment__bonus-persent">
                      {user.id === -1
                        ? null
                        : products?.product?.priceProduct -
                          products?.product?.priceProduct *
                            (listPromotionsUsers.percentPromotionsUsers / 100) +
                          "₽ - цена со скидкой"}
                    </p>
                  ) : null}
                </div> */}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <NotFound />
          )}
        </div>
      </div>
    </section>
  );
});

export default DevicePage;

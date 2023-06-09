import { $authHost, $host } from "./Http";

export const createSale = async (
  idClient,
  idProduct,
  priceSale,
  numberSale,
  countProductSale,
  countAllSale
) => {
  const { data } = await $host.post("/api/sale", {
    idClient,
    idProduct,
    priceSale,
    countAllSale,
    numberSale,
    countProductSale,
  });

  return data;
};

export const getNumberSale = async () => {
  const { data } = await $host.get("/api/sale/numberSale");

  return data;
};

export const fetchSale = async () => {
  const { data } = await $authHost.get("/api/sale");

  return data;
};

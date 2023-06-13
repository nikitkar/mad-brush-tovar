import { $authHost, $host } from "./Http";

export const createProductWaybill = async (productWaybill) => {
  const { data } = await $authHost.post("/api/productWaybill", productWaybill);

  return data;
};

export const getProductWaybill = async () => {
  const { data } = await $host.get("/api/productWaybill/numberProductWaybill");

  return data;
};

export const fetchProductWaybill = async () => {
  const { data } = await $host.get("/api/productWaybill");

  return data;
};

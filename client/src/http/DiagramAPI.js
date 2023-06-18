import { $authHost } from "./Http";

export const getClientD = async () => {
  const { data } = await $authHost.get("/api/diagram/clientD");

  return data;
};

export const getProductD = async () => {
  const { data } = await $authHost.get("/api/diagram/productD");

  return data;
};

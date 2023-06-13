import { $authHost, $host } from "./Http";

export const createInvoice = async (Invoice) => {
  const { data } = await $authHost.post("/api/invoice", Invoice);

  return data;
};

export const fetchInvoice = async () => {
  const { data } = await $host.get("/api/invoice");

  return data;
};

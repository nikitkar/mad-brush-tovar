import { $authHost, $host } from "./Http";

export const createSuppliers = async (suppliers) => {
  const { data } = await $authHost.post("/api/suppliers", suppliers);

  return data;
};

export const fetchSuppliers = async () => {
  const { data } = await $host.get("/api/suppliers");

  return data;
};

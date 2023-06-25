import ApiError from "../error/ApiError.js";

import { db } from "../MySQL.js";

class SaleControlles {
  async create(req, res, next) {
    const {
      idClient,
      idProduct,
      priceSale,
      countAllSale,
      numberSale,
      countProductSale,
      dataSale = new Date().toISOString().slice(0, 19).replace("T", " "),
    } = req.body;

    if (
      !idClient ||
      idClient == "" ||
      !idProduct ||
      idProduct == "" ||
      !priceSale ||
      priceSale == "" ||
      !countAllSale ||
      countAllSale == "" ||
      !numberSale ||
      numberSale == "" ||
      !countProductSale ||
      countProductSale == ""
    )
      return next(ApiError.badRequest("Заполните все поля!"));

    const query = `INSERT INTO sale(idClient, idProduct, dataSale, priceSale, countAllSale, numberSale, countProductSale) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    await db.query(
      query,
      [
        idClient,
        idProduct,
        dataSale,
        priceSale,
        countAllSale,
        numberSale,
        countProductSale,
      ],
      (err, data) => {
        if (err) return res.json(err);
        else return res.json({ message: "Успешно" });
      }
    );
  }

  async getNumberSale(req, res) {
    const query = `SELECT MAX(numberSale) AS total FROM sale`;

    await db.query(query, (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    });
  }

  async getAll(req, res) {
    const query = "SELECT * FROM sale";

    await db.query(query, (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    });
  }
}

export { SaleControlles };

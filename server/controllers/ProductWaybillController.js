import ApiError from "../error/ApiError.js";

import { db } from "../MySQL.js";

class ProductWaybillController {
  async create(req, res, next) {
    const { idInvice, idProduct, numberProduct_waybill, countProduct_waybill } =
      req.body;

    if (
      !idInvice ||
      idInvice == "" ||
      !idProduct ||
      idProduct == "" ||
      !numberProduct_waybill ||
      numberProduct_waybill == "" ||
      !countProduct_waybill ||
      countProduct_waybill == ""
    )
      return next(
        ApiError.badRequest(
          "Incorrect idInvice, idProduct, numberProduct_waybill, countProduct_waybill"
        )
      );

    const query = `INSERT INTO productWaybill(idInvice, idProduct, numberProduct_waybill, countProduct_waybill) VALUES (?, ?, ?, ?)`;

    await db.query(
      query,
      [idInvice, idProduct, numberProduct_waybill, countProduct_waybill],
      (err, data) => {
        if (err) return res.json(err);
        else return res.json({ message: "Successful" });
      }
    );
  }

  async getMaxNumber(req, res) {
    const query = `SELECT MAX(numberProduct_waybill) AS total FROM numberProduct_waybill`;

    await db.query(query, (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    });
  }

  async getAll(req, res) {
    const query = "SELECT * FROM productWaybill";

    await db.query(query, (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    });
  }
}

export { ProductWaybillController };

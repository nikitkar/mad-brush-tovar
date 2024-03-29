import ApiError from "../error/ApiError.js";

import { db } from "../MySQL.js";

class InvoiceController {
  async create(req, res, next) {
    const {
      idSuppliers,
      idPointIssue,
      priceInvoice,
      dateDeliveryInvoice,
      countInvoice,
    } = req.body;

    if (
      !idSuppliers ||
      idSuppliers == "" ||
      !idPointIssue ||
      idPointIssue == "" ||
      !priceInvoice ||
      priceInvoice == "" ||
      !countInvoice ||
      countInvoice == ""
    )
      return next(
        ApiError.badRequest(
          "Заполните все поля!"
        )
      );

    const query = `INSERT INTO invoice(idSuppliers, idPointIssue, priceInvoice, dateDeliveryInvoice, countInvoice) VALUES (?, ?, ?, ?, ?)`;

    await db.query(
      query,
      [
        idSuppliers,
        idPointIssue,
        priceInvoice,
        dateDeliveryInvoice,
        countInvoice,
      ],
      (err, data) => {
        if (err) return res.json(err);
        else return res.json({ message: "Успешно" });
      }
    );
  }

  async getAll(req, res) {
    const query = "SELECT * FROM invoice";

    await db.query(query, (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    });
  }
}

export { InvoiceController };

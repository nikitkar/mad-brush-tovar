import ApiError from "../error/ApiError.js";

import { db } from "../MySQL.js";

class SalesArchiveController {
  async create(req, res, next) {
    const {
      idSale,
      statusSalesArchive
    } = req.body;

    if (
      !idSale ||
      idSale == "" ||
      !statusSalesArchive ||
      statusSalesArchive == ""
    )
      return next(
        ApiError.badRequest(
          "Incorrect idSale or statusSalesArchive"
        )
      );

    const query = `INSERT INTO salesArchive(idSale, statusSalesArchive) VALUES (?, '?')`;

    await db.query(query, [idSale, statusSalesArchive], (err, data) => {
      if (err) return res.json(err);
      else return res.json({ message: "Successful" });
    });
  }

  async getAll(req, res) {
    const query = "SELECT * FROM salesArchive";

    await db.query(query, (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    });
  }
}

export { SalesArchiveController };

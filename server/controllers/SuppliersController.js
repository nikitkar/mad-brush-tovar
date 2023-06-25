import ApiError from "../error/ApiError.js";

import { db } from "../MySQL.js";

class SuppliersController {
  async create(req, res, next) {
    const { name } = req.body;

    if (!name || name == "") return next(ApiError.badRequest("Заполните все поля!"));

    const query = `INSERT INTO suppliers(nameSuppliers) VALUES (?)`;

    await db.query(query, name, (err, data) => {
      if (err) return res.json(err);
      else return res.json({ message: "Успешно" });
    });
  }

  async getAll(req, res) {
    const query = "SELECT * FROM suppliers";

    await db.query(query, (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    });
  }
}

export { SuppliersController };

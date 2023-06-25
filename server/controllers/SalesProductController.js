import ApiError from "../error/ApiError.js";

import { db } from "../MySQL.js";

class SalesProductController {
  async create(req, res, next) {
    const { name, countAll = 0 } = req.body;

    if (!name || name == "") return next(ApiError.badRequest("Заполните все поля!"));

    const query = `INSERT INTO category(nameCategory, countAllCategory) VALUES (?, ?)`;

    await db.query(query, [name, countAll], (err, data) => {
      if (err) return res.json(err);
      else return res.json({ message: "Успешно" });
    });
  }
  async getAll(req, res) {
    const query = "SELECT * FROM category";

    await db.query(query, (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    });
  }
}

export { SalesProductController };

import ApiError from "../error/ApiError.js";

import { db } from "../MySQL.js";

class CategoryController {
  // добавлени в базу запись
  async create(req, res, next) {
    const { name, imgCategory } = req.body;

    // проверка на валидность
    if (!name || (name == "" && !imgCategory) || imgCategory == "")
      return next(ApiError.badRequest("Incorrect name or img"));

    const query = `INSERT INTO category(nameCategory, imgCategory) VALUES ('${name}', ${imgCategory})`;

    await db.query(query, (err, data) => {
      if (err) return res.json(err);
      else return res.json({ message: "Successful" });
    });
  }

  // получение записи
  async getAll(req, res) {
    const query = "SELECT * FROM category";

    await db.query(query, (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    });
  }
}

export { CategoryController };

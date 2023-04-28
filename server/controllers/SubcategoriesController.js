import ApiError from "../error/ApiError.js";

import { db } from "../MySQL.js";

class SubcategoriesController {
  // добавлени в базу запись
  async create(req, res, next) {
    const { idCategory, name, img } = req.body;

    // проверка на валидность
    if (
        !idCategory || idCategory == "" &&
        !name || name == "" &&
        !img || img == ""
    )
      return next(ApiError.badRequest("Incorrect name or img or idCategory"));

    const query = `INSERT INTO subcategories(idCategory, nameSubcategories, imgSubcategories) VALUES (${idCategory}, '${nameSubcategories}', '${imgSubcategories}')`;

    await db.query(query, (err, data) => {
      if (err) return res.json(err);
      else return res.json({ message: "Successful" });
    });
  }

  // получение записи
  async getAll(req, res) {
    const query = "SELECT * FROM subcategories";

    await db.query(query, (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    });
  }
}

export { SubcategoriesController };

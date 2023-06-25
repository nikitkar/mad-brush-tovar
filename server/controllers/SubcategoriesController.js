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
      return next(ApiError.badRequest("Заполните все поля!"));

    const query = `INSERT INTO subcategories(idCategory, nameSubcategories, imgSubcategories) VALUES (?, ?, ?)`;

    await db.query(query, [idCategory, nameSubcategories, imgSubcategories], (err, data) => {
      if (err) return res.json(err);
      else return res.json({ message: "Успешно" });
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

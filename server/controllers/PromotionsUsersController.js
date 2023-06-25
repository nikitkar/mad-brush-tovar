import ApiError from "../error/ApiError.js";

import { db } from "../MySQL.js";

class PromotionsUsersController {
  async create(req, res, next) {
    const { idClient, percentPromotionsUsers } = req.body;

    if (
      !idClient ||
      idClient == "" ||
      !percentPromotionsUsers ||
      percentPromotionsUsers == ""
    )
      return next(ApiError.badRequest("Заполните все поля!"));

    const query = `INSERT INTO promotionsUsers(idClient, percentPromotionsUsers) VALUES (?, ?)`;

    await db.query(query, [idClient, percentPromotionsUsers], (err, data) => {
      if (err) return res.json(err);
      else return res.json({ message: "Успешно" });
    });
  }

  async getAll(req, res) {
    const query = "SELECT * FROM promotionsUsers";

    await db.query(query, (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    });
  }
}

export { PromotionsUsersController };

import ApiError from "../error/ApiError.js";

import { db } from "../MySQL.js";

class PointIssueController {
  async create(req, res, next) {
    const { address, workingTime } = req.body;

    if (!address || address == "" || !workingTime || workingTime == "")
      return next(ApiError.badRequest("Заполните все поля!"));

    const query = `INSERT INTO pointIssue(addressPointIssue, workingHousePointIssue) VALUES (?, ?)`;

    await db.query(query, [address, workingTime], (err, data) => {
      if (err) return res.json(err);
      else return res.json({ message: "Успешно" });
    });
  }

  async getAll(req, res) {
    const query = "SELECT * FROM pointIssue";

    await db.query(query, (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    });
  }
}

export { PointIssueController };

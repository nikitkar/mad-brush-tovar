import ApiError from "../error/ApiError.js";

import { db } from "../MySQL.js";

class GetDataTableController {
  async get(req, res, next) {
    const { name } = req.query;

    if (!name || name == "") return next(ApiError.badRequest("Incorrect name"));

    const query = "SELECT * FROM ??";

    await db.query(query, name, (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    });
  }

  async deletedRow(req, res, next) {
    try {
      const { id, nameTable, nameColumn } = req.query;

      if (
        !id ||
        id == "" ||
        !nameTable ||
        nameTable == "" ||
        !nameColumn ||
        nameColumn == ""
      )
        return next(
          ApiError.badRequest("Incorrect id or nameTable or nameColumn")
        );

      if (nameTable === "client") {
        const query = `DELETE FROM promotionsUsers WHERE promotionsUsers.idClient=?`;

        db.query(query, [id]);
      }

      const query = `DELETE FROM ?? WHERE ??.??=?`;

      await db.query(
        query,
        [nameTable, nameTable, nameColumn, id],
        (err, data) => {
          if (err) return res.json({ err: err });
          else return res.json({ message: "Запись удалена" });
        }
      );
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async editRow(req, res, next) {
    try {
      const { nameTable, arrDataContent, objIdValue } = req.query;

      if (
        !nameTable ||
        nameTable == "" ||
        !arrDataContent ||
        arrDataContent == "" ||
        !objIdValue ||
        objIdValue == ""
      )
        return next(
          ApiError.badRequest(
            "Incorrect nameTable or arrDataContent or objIdValue"
          )
        );

      let query = "";

      if (nameTable.toLowerCase() === "client") {
        query = `UPDATE ${nameTable}, promotionsUsers SET ${arrDataContent} WHERE client.${objIdValue} AND promotionsUsers.${objIdValue};`;
      } else
        query = `UPDATE ${nameTable} SET ${arrDataContent} WHERE ${objIdValue};`;

      await db.query(query, (err, data) => {
        if (err) return res.json({ err: err });
        else return res.json({ message: "Запись изменена" });
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async searchData(req, res, next) {
    const { nameTable, nameColumn, content } = req.query;

    if (!nameTable || nameTable == "" || !nameColumn || nameColumn == "")
      return next(
        ApiError.badRequest("Incorrect content or nameTable or nameColumn")
      );

    const query = `SELECT * FROM ?? WHERE ?? LIKE ?`;

    await db.query(
      query,
      [nameTable, nameColumn, "%" + content + "%"],
      (err, data) => {
        if (err) return res.json(err);
        else return res.json(data);
      }
    );
  }

  async sortData(req, res, next) {
    try {
      const { nameTable, nameColumn, sortParam } = req.query;

      if (
        !nameColumn ||
        nameColumn == "" ||
        !nameTable ||
        nameTable == "" ||
        !sortParam ||
        sortParam == ""
      )
        return next(
          ApiError.badRequest("Incorrect nameTable or nameTable or sortParam")
        );

      const query =
        `SELECT * FROM ?? ORDER BY ?? ` +
        (sortParam === "DESC" ? "DESC" : "ASC");

      await db.query(query, [nameTable, nameColumn], (err, data) => {
        if (err) return res.json(err);
        else return res.json(data);
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async sortData_search(req, res, next) {
    try {
      const {
        nameTable,
        nameColumnSeacrh,
        content,
        nameColumnSort,
        sortParam,
      } = req.query;

      if (
        !nameTable ||
        nameTable == "" ||
        !nameColumnSeacrh ||
        nameColumnSeacrh == "" ||
        !content ||
        content == "" ||
        !nameColumnSort ||
        nameColumnSort == "" ||
        !sortParam ||
        sortParam == ""
      )
        return next(
          ApiError.badRequest(
            "Incorrect nameTable or nameColumnSeacrh or content or nameColumnSort or sortParam"
          )
        );

      const query =
        `
      SELECT * FROM ?? WHERE ?? LIKE ? ORDER BY ?? ` +
        (String(sortParam).toLocaleLowerCase() === "desc" ? "DESC" : "ASC");

      await db.query(
        query,
        [nameTable, nameColumnSeacrh, "%" + content + "%", nameColumnSort],
        (err, data) => {
          if (err) return res.json(err);
          else return res.json(data);
        }
      );
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getClient_discount(req, res, next) {
    try {
      const { nameColumn, sortParam } = req.query;

      if (!nameColumn || nameColumn == "" || !sortParam || sortParam == "")
        return next(ApiError.badRequest("Incorrect nameColumn or sortParam"));

      const query =
        nameColumn === "percentPromotionsUsers"
          ? `SELECT client.idClient, client.nameClient, client.emailClient, client.telephoneClient, client.addressClient, promotionsUsers.percentPromotionsUsers FROM client, promotionsUsers WHERE client.idClient = promotionsUsers.idClient ORDER BY promotionsUsers.?? ` +
            (String(sortParam).toLocaleLowerCase() === "desc" ? "DESC" : "ASC")
          : `SELECT client.idClient, client.nameClient, client.emailClient, client.telephoneClient, client.addressClient, promotionsUsers.percentPromotionsUsers FROM client, promotionsUsers WHERE client.idClient = promotionsUsers.idClient ORDER BY client.?? ` +
            (String(sortParam).toLocaleLowerCase() === "desc" ? "DESC" : "ASC");

      await db.query(query, [nameColumn], (err, data) => {
        if (err) return res.json(err);
        else return res.json(data);
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getClient_discount_search(req, res, next) {
    try {
      const { columnNameSort, columnNameSearch, sortParam, content } =
        req.query;

      if (
        !columnNameSort ||
        columnNameSort == "" ||
        !columnNameSearch ||
        columnNameSearch == "" ||
        !sortParam ||
        sortParam == "" ||
        !content ||
        content == ""
      )
        return next(
          ApiError.badRequest(
            "Incorrect or columnNameSort or columnNameSearch or sortParam or content"
          )
        );

      const query =
        columnNameSearch === "percentPromotionsUsers"
          ? `SELECT client.idClient, client.nameClient, client.emailClient, client.telephoneClient, client.addressClient, promotionsUsers.percentPromotionsUsers
          FROM client, promotionsUsers
          WHERE client.idClient = promotionsUsers.idClient 
          AND promotionsUsers.??
          LIKE ? 
          ORDER BY ?? ` +
            (String(sortParam).toLocaleLowerCase() === "desc" ? "DESC" : "ASC")
          : `SELECT client.idClient, client.nameClient, client.emailClient, client.telephoneClient, client.addressClient, promotionsUsers.percentPromotionsUsers
          FROM client, promotionsUsers
          WHERE client.idClient = promotionsUsers.idClient 
          AND client.??
          LIKE ?
          ORDER BY ?? ` +
            (String(sortParam).toLocaleLowerCase() === "desc" ? "DESC" : "ASC");

      await db.query(
        query,
        [columnNameSearch, "%" + content + "%", columnNameSort],
        (err, data) => {
          if (err) return res.json(err);
          else return res.json(data);
        }
      );
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export { GetDataTableController };

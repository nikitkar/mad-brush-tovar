import ApiError from "../error/ApiError.js";

import { db } from "../MySQL.js";

class GetDataTableController {
  async get(req, res, next) {
    const { name } = req.query;

    if (!name || name == "") return next(ApiError.badRequest("Incorrect name"));

    const query = `SELECT * FROM ?`;

    await db.query(query, name, (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    });
  }

  async deletedRow(req, res, next) {
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

    const query = `DELETE FROM ? WHERE ?.?=?`;

    await db.query(
      query,
      [nameTable, nameTable, nameColumn, id],
      (err, data) => {
        if (err) return res.json(err);
        else return res.json(data);
      }
    );
  }

  async searchData(req, res, next) {
    const { nameTable, nameColumn, content } = req.query;

    if (!nameTable || nameTable == "" || !nameColumn || nameColumn == "")
      return next(
        ApiError.badRequest("Incorrect content or nameTable or nameColumn")
      );

    const query = `SELECT * FROM ? WHERE ? LIKE '%?%'`;

    await db.query(query, [nameTable, nameColumn, content], (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    });
  }

  async sortData(req, res, next) {
    try {
      const { nameTable, nameColumn, methodSort } = req.query;

      if (
        !nameColumn ||
        nameColumn == "" ||
        !nameTable ||
        nameTable == "" ||
        !methodSort ||
        methodSort == ""
      )
        return next(
          ApiError.badRequest("Incorrect nameTable or nameTable or methodSort")
        );

      const query = `SELECT * FROM ? ORDER BY ? ?`;

      await db.query(
        query,
        [nameTable, nameColumn, methodSort],
        (err, data) => {
          if (err) return res.json(err);
          else return res.json(data);
        }
      );
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
        methodSort,
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
        !methodSort ||
        methodSort == ""
      )
        return next(
          ApiError.badRequest(
            "Incorrect nameTable or nameColumnSeacrh or content or nameColumnSort or methodSort"
          )
        );

      const query = `
      SELECT * FROM ? WHERE ? LIKE '%?%' ORDER BY ? ?`;

      await db.query(
        query,
        [nameTable, nameColumnSeacrh, content, nameColumnSort, methodSort],
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
          ? `SELECT client.idClient, client.nameClient, client.emailClient, client.telephoneClient, client.addressClient, promotionsUsers.percentPromotionsUsers FROM client, promotionsUsers WHERE client.idClient = promotionsUsers.idClient ORDER BY promotionsUsers.? ?`
          : `SELECT client.idClient, client.nameClient, client.emailClient, client.telephoneClient, client.addressClient, promotionsUsers.percentPromotionsUsers FROM client, promotionsUsers WHERE client.idClient = promotionsUsers.idClient ORDER BY client.? ?`;

      await db.query(query, [nameColumn, sortParam], (err, data) => {
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
        return next(ApiError.badRequest("Incorrect or sortParam"));

      const query =
        columnNameSort === "percentPromotionsUsers"
          ? `SELECT client.idClient, client.nameClient, client.emailClient, client.telephoneClient, client.addressClient, promotionsUsers.percentPromotionsUsers
          FROM client, promotionsUsers
          WHERE client.idClient = promotionsUsers.idClient 
          AND promotionsUsers.? 
          LIKE '%?%' 
          ORDER BY ? ?`
          : `SELECT client.idClient, client.nameClient, client.emailClient, client.telephoneClient, client.addressClient, promotionsUsers.percentPromotionsUsers
          FROM client, promotionsUsers
          WHERE client.idClient = promotionsUsers.idClient 
          AND client.? 
          LIKE '%?%' 
          ORDER BY ? ?`;

      await db.query(
        query,
        [columnNameSearch, content, columnNameSort, sortParam],
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

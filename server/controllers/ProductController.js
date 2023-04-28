import ApiError from "../error/ApiError.js";
import { v4 as uuidv4 } from "uuid";

import { db } from "../MySQL.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
import * as path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class ProductController {
  async create(req, res, next) {
    try {
      const {
        name,
        price,
        count,
        info,
        idCategory,
        idSubcategories = null,
      } = req.body;
      const { img } = req.files;

      if (!name || !price || !count || !info || !idCategory || !img)
        return next(
          ApiError.badRequest(
            "Incorrect name / price / info / idCategory / img / idSubcategories"
          )
        );

      let fileName = uuidv4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName), (err) => {
        if (err) next(ApiError.internal(err.message));
      });

      const createProductQuery = `INSERT INTO product(idCategory, idSubcategories, nameProduct, priceProduct, imgProduct) VALUES (?, ?, '?', ?, ?, '?')`;

      await db.query(
        createProductQuery,
        [idCategory, idSubcategories, name, price, count, fileName],
        (err, data) => {
          if (err) return res.json(err);
          else return res.json(data);
        }
      );

      const idProductLastQuery = "SELECT max(idProduct) FROM product";
      const idProductLast = await new Promise((resolve) => {
        db.query(idProductLastQuery, (err, data) => {
          if (err) return res.json(err);
          else return resolve(data);
        });
      });

      if (info) {
        info = JSON.parse(info);

        info.forEach((item) => {
          const query = `INSERT INTO product_info(idProduct, titleProduct, descriptionProduct) VALUES (?, ?, ?)`;

          db.query(
            query,
            [idProductLast, item.title, item.description],
            (err, data) => {
              if (err) return res.json(err);
              else return res.json(data);
            }
          );
        });
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const { idCategory, limit = 12, page = 1 } = req.query;

      let products;
      let offset = page * limit - limit;

      if (idCategory) {
        const productCategoryQuery = `SELECT * FROM product WHERE idCategory=? LIMIT ? OFFSET ?`;

        products = await new Promise((resolve) => {
          db.query(
            productCategoryQuery,
            [idCategory, limit, offset],
            (err, data) => {
              if (err) return res.json(err);
              else return resolve(data);
            }
          );
        });
      }

      if (!idCategory) {
        const productAllQuery = `SELECT * FROM product LIMIT ${limit} OFFSET ${offset}`;

        products = await new Promise((resolve) => {
          db.query(productAllQuery, (err, data) => {
            if (err) return res.json(err);
            else return resolve(data);
          });
        });
      }

      return res.json(products);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAllProduct(req, res, next) {
    try {
      const productAllQuery = "SELECT * FROM product";

      db.query(productAllQuery, (err, data) => {
        if (err) return res.json(err);
        else return res.json(data);
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      let product;
      const { id } = req.params;

      const productOneQuery = `CALL getProduct_with_category(?)`;

      const product_infoQuery = `SELECT * FROM product_info WHERE idProduct=?`;

      const productOne = await new Promise((resolve) => {
        db.query(productOneQuery, id, (err, data) => {
          if (err) return res.json(err);
          else return resolve(data[0][0]);
        });
      });

      const product_info = await new Promise((resolve) => {
        db.query(product_infoQuery, id, (err, data) => {
          if (err) return res.json(err);
          else return resolve(data);
        });
      });

      product = {
        product: productOne,
        info: product_info,
      };

      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export { ProductController };

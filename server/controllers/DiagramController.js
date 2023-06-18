import ApiError from "../error/ApiError.js";

import { db } from "../MySQL.js";

class DiagramController {
  async clientD(req, res) {
    const query = `
    SELECT client.nameClient AS name, COUNT(sale.idClient) AS total
    FROM sale, client
    WHERE dataSale >= DATE_SUB(CURRENT_DATE, INTERVAL 5 MONTH) AND sale.idClient = client.idClient
    GROUP BY client.nameClient
    ORDER BY total DESC
    LIMIT 3`;

    await db.query(query, (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    });
  }

  async productD(req, res) {
    const query = `
    SELECT t1.dataSale, t1.nameProduct AS name, t1.total
        FROM (
            SELECT dataSale, nameProduct, YEAR(dataSale) AS year, MONTH(dataSale) AS month, SUM(countProductSale) AS total,
                ROW_NUMBER() OVER(PARTITION BY YEAR(dataSale), MONTH(dataSale) ORDER BY SUM(countProductSale) DESC) AS rn
            FROM sale, product
            WHERE dataSale BETWEEN DATE_SUB(NOW(), INTERVAL 5 MONTH) AND NOW() AND product.idProduct = sale.idProduct
            GROUP BY nameProduct, YEAR(dataSale), MONTH(dataSale)
        ) t1
    WHERE t1.rn = 1
    ORDER BY t1.dataSale ASC
    LIMIT 5;`;

    await db.query(query, (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    });
  }
}

export { DiagramController };

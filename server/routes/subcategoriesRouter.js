import Router from "express";

import { SubcategoriesController } from "../controllers/SubcategoriesController.js";
import { CheckMiddleware } from "../middleware/CheckMiddleware.js";

const subcategoriesRouter = new Router();
const subcategoriesController = new SubcategoriesController();

subcategoriesRouter.post(
  "/",
  CheckMiddleware("ADMIN"),
  subcategoriesController.create
);
subcategoriesRouter.get("/", subcategoriesController.getAll);

export { subcategoriesRouter };

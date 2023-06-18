import Router from "express";

import { DiagramController } from "../controllers/DiagramController.js";
import { CheckMiddleware } from "../middleware/CheckMiddleware.js";

const diagramRouter = new Router();
const diagramController = new DiagramController();

diagramRouter.get(
  "/clientD",
  CheckMiddleware("ADMIN"),
  diagramController.clientD
);
diagramRouter.get(
  "/productD",
  CheckMiddleware("ADMIN"),
  diagramController.productD
);
diagramController;
export { diagramRouter };

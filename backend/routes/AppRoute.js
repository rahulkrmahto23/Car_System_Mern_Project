const { Router } = require("express");
const userRoutes = require("./userRoutes");
const carRoutes = require("./carRoutes")
const appRouter = Router();

appRouter.use("/user", userRoutes); // domain/api/v1/user
appRouter.use("/car",carRoutes);

module.exports = appRouter;

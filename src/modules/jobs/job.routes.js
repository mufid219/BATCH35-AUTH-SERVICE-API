const express = require("express");
const authenticate = require("../../shared/middlewares/authenticate");
const authorize = require("../../shared/middlewares/authorize");
const JobController = require("./job.controller");

const router = express.Router();

router.get("/", authenticate, JobController.index);
router.get("/:id", authenticate, JobController.show);
router.post("/", authenticate, JobController.create);
router.put("/:id", authenticate, JobController.update);
router.delete(
  "/:id",
  authenticate,
  authorize.roles("SUPER_ADMIN", "ADMIN"),
  JobController.delete,
);

module.exports = router;

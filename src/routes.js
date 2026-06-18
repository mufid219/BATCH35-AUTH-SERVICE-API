const express = require("express");
const authRoutes = require("./modules/auths/auth.routes");
const departmentRoutes = require("./modules/departments/department.routes");
const jobRoutes = require("./modules/jobs/job.routes");
const authorizationRoutes = require("./modules/authorization/authorization.routes");
// tambah route lain di sini, contoh:
//const employeesRoutes   = require('./employeesRoutes');

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/departments", departmentRoutes);
router.use("/jobs", jobRoutes);
router.use("/authorization", authorizationRoutes);

module.exports = router;

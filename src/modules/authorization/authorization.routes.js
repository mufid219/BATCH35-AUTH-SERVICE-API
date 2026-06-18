const express = require("express");
const AuthorizationController = require("./authorization.controller");
const authenticate = require("../../shared/middlewares/authenticate");
const authorize = require("../../shared/middlewares/authorize");

const router = express.Router();

// profile + roles
router.get(
  "/users/:userId",
  authenticate,
  authorize.roles("SUPER_ADMIN", "ADMIN"),
  AuthorizationController.getUserAuthorization,
);

// semua role
router.get(
  "/roles",
  authenticate,
  authorize.roles("SUPER_ADMIN", "ADMIN"),
  AuthorizationController.getAllRoles,
);

// user role by userId
router.get(
  "/users/:userId/roles",
  authenticate,
  authorize.roles("SUPER_ADMIN", "ADMIN"),
  AuthorizationController.getUserRoles,
);

// update role user
router.put(
  "/users/:userId/roles",
  authenticate,
  authorize.roles("SUPER_ADMIN", "ADMIN"),
  AuthorizationController.updateUserRoles,
);

// semua permission
router.get(
  "/permissions",
  authenticate,
  authorize.roles("SUPER_ADMIN", "ADMIN"),
  AuthorizationController.getAllPermissions,
);

// permission berdasarkan role
router.get(
  "/roles/:roleId/permissions",
  authenticate,
  authorize.roles("SUPER_ADMIN", "ADMIN"),
  AuthorizationController.getPermissionByRoleId,
);

// update permission role
router.put(
  "/roles/:roleId/permissions",
  authenticate,
  authorize.roles("SUPER_ADMIN", "ADMIN"),
  AuthorizationController.updateRolePermissons,
);

// remove permission role
router.delete(
  "/roles/:roleId/permissions",
  authenticate,
  authorize.roles("SUPER_ADMIN", "ADMIN"),
  AuthorizationController.deleteRolePermission,
);

module.exports = router;

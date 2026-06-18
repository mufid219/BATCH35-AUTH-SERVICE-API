const response = require("../../shared/utils/response");
const AuthorizationService = require("./authorization.service");

const AuthorizationController = {
  async getUserAuthorization(req, res, next) {
    try {
      const { userId } = req.params;

      const data = await AuthorizationService.getUserAuthorization(
        Number(userId),
      );
      response.success(res, data, "Data user berhasil dimuat", 200);
    } catch (err) {
      next(err);
    }
  },

  async getAllRoles(req, res, next) {
    try {
      const data = await AuthorizationService.getRoles();
      response.success(res, data, "Role user", 200);
    } catch (error) {
      next(error);
    }
  },

  async getUserRoles(req, res, next) {
    try {
      const { userId } = req.params;
      const data = await AuthorizationService.getUserRoles(Number(userId));
      response.success(res, data, "Role user", 200);
    } catch (error) {
      next(error);
    }
  },

  async updateUserRoles(req, res, next) {
    try {
      const { userId } = req.params;

      const { roles } = req.body;

      await AuthorizationService.updateUserRoles(Number(userId), roles);

      const data = await AuthorizationService.getUserRoles(userId);

      response.success(res, data, "Role user berhasil diubah", 200);
    } catch (err) {
      next(err);
    }
  },

  async getAllPermissions(req, res, next) {
    try {
      const data = await AuthorizationService.getAllPermissions();
      response.success(res, data, "Permission user", 200);
    } catch (error) {
      next(error);
    }
  },

  async getPermissionByRoleId(req, res, next) {
    try {
      const { roleId } = req.params;
      const data = await AuthorizationService.getRolePermissions(
        Number(roleId),
      );
      response.success(res, data, "Permission user", 200);
    } catch (error) {
      next(error);
    }
  },

  async updateRolePermissons(req, res, next) {
    try {
      const { roleId } = req.params;

      const { permissionId } = req.body;

      await AuthorizationService.updateRolePermissions(
        Number(roleId),
        permissionId,
        req.user.sub,
      );

      const data = await AuthorizationService.getRolePermissions(roleId);

      response.success(res, data, "Role user berhasil diubah", 200);
    } catch (err) {
      next(err);
    }
  },

  async deleteRolePermission(req, res, next) {
    try {
      const { roleId } = req.params;
      const { permissionId } = req.body;
      const data = await AuthorizationService.removeRolePermission(
        Number(roleId),
        Number(permissionId),
      );
      return response.success(res, data, "Permission berhasil dihapus");
    } catch (error) {
      next(error);
    }
  },
};

module.exports = AuthorizationController;

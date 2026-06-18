const AppError = require("../../shared/utils/AppError");
const AuthorizationRepository = require("./authorization.repository");

const AuthorizationService = {
  // Profile User
  async getUserAuthorization(userId) {
    const user = await AuthorizationRepository.findUserById(userId);

    // const roles = await AuthorizationRepository.findUserRoles(userId);

    // const roleId = roles[0].ROLE_ID;
    // const permissions =
    //   await AuthorizationRepository.findUserPermission(roleId);
    if (!user)
      throw new AppError(`User dengan ID ${userId} tidak ditemukan`, 404);
    return user;
  },

  // Roles
  async getRoles() {
    const roles = await AuthorizationRepository.findAllRoles();
    if (!roles) throw new AppError(`Role tidak ditemukan`, 404);
    return roles;
  },

  async getUserRoles(userId) {
    const role = await AuthorizationRepository.findUserRoles(userId);
    if (!role)
      throw new AppError(`Role dengan userid ${userId} tidak ditemukan`, 404);
    return role;
  },

  async updateUserRoles(userId, roles) {
    this.getUserRoles(userId);
    const deleted = await AuthorizationRepository.deleteUserRoles(userId);
    if (!deleted) throw new AppError("Gagal menghapus role", 500);

    await AuthorizationRepository.insertUserRoles(userId, roles);
  },

  // Permissions

  async getAllPermissions() {
    const permissions = await AuthorizationRepository.findAllPermissions();
    if (!permissions) throw new AppError(`Permission tidak ditemukan`, 404);
    return permissions;
  },

  async getRolePermissions(roleId) {
    const permission =
      await AuthorizationRepository.findPermissionByRole(roleId);
    if (!permission)
      throw new AppError(`Permission dengan ${roleId} tidak ditemukan`, 404);
    return permission;
  },

  async updateRolePermissions(roleId, permissionId, grantedBy) {
    await this.getRolePermissions(roleId);

    return await AuthorizationRepository.addToRole(
      roleId,
      permissionId,
      grantedBy,
    );
  },

  async removeRolePermission(roleId, permissionId) {
    await this.getRolePermissions(roleId);
    const deleted = await AuthorizationRepository.removeFromRole(
      roleId,
      permissionId,
    );
    if (!deleted) throw new AppError("Gagal menghapus permission", 500);
    return { role_id: roleId, permission_id: permissionId };
  },
};

module.exports = AuthorizationService;

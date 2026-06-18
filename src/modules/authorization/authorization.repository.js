const oracledb = require("oracledb");
const { query } = require("../../shared/utils/db");

const AuthorizationRepository = {
  // User Profile
  async findUserById(userId) {
    const r = await query(
      `
        SELECT
            USER_ID,
            USERNAME,
            EMAIL
        FROM users
        WHERE USER_ID=:userId`,
      {
        userId,
      },
    );

    return r.rows[0] || null;
  },

  // Roles

  async findAllRoles() {
    const r = await query(
      `
        SELECT
        role_id,
        role_code,
        role_name
        FROM roles
        ORDER BY role_name
        `,
    );
    // const r = await query(
    //   `
    //     SELECT
    //         r.role_id,
    //         r.role_code,
    //         r.role_name
    //     FROM user_roles ur
    //     JOIN roles r
    //     ON r.role_id = ur.role_id
    //     `,
    // );

    return r.rows;
  },

  async findUserRoles(userId) {
    const r = await query(
      `
        SELECT
            r.role_id,
            r.role_code,
            r.role_name
        FROM user_roles ur
        JOIN roles r
        ON r.role_id = ur.role_id
        WHERE ur.user_id=:userId`,
      {
        userId,
      },
    );

    return r.rows;
  },

  async deleteUserRoles(userId) {
    const r = await query(
      `
        DELETE FROM user_roles
        WHERE user_id = :userId
        `,
      { userId },
    );

    return r.rowsAffected > 0;
  },

  async insertUserRoles(userId, roles) {
    for (const roleId of roles) {
      await query(
        `
        INSERT INTO user_roles
            (user_id,role_id)
        VALUES (:userId,:roleId)    
        `,
        {
          userId,
          roleId,
        },
      );
    }
  },

  // Permissions

  async findAllPermissions() {
    const r = await query(
      `
        SELECT
          permission_id,
          permission_code,
          module,
          action, 
          description
        FROM permissions
        ORDER BY module, action
       `,
    );

    return r.rows;
  },

  async findPermissionByRole(roleId) {
    const r = await query(
      `
        SELECT
            p.permission_id,
            p.permission_code,
            p.module,
            p.action
        FROM role_permissions rp
        JOIN permissions p
        ON p.permission_id=
        rp.permission_id
        WHERE rp.role_id=:roleId`,
      {
        roleId,
      },
    );

    return r.rows;
  },

  async removeFromRole(roleId, permissionId) {
    const r = await query(
      `
        DELETE FROM role_permissions
        WHERE role_id = :roleId
        AND permission_id = :permissionId
        `,
      { roleId, permissionId },
    );

    return r.rowsAffected > 0;
  },

  async addToRole(roleId, permissionId, grantedBy) {
    const r = await query(
      `
        INSERT INTO role_permissions
            (role_id, permission_id, granted_by)
        VALUES (:roleId, :permissionId, :grantedBy)    
        `,
      {
        roleId,
        permissionId,
        grantedBy,
      },
    );
  },
};

module.exports = AuthorizationRepository;

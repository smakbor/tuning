export const createPermissionCheck = (user, permissions, permissionKey, buttonName) => {
  if (user.role == 'MERCHANT' || permissions?.[permissionKey]?.create) {
    return buttonName;
  }
};


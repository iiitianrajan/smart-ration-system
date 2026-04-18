const ROLE_ALIASES = {
  Citizen: 'user',
  ShopOwner: 'dealer',
  Admin: 'admin',
  user: 'user',
  dealer: 'dealer',
  admin: 'admin',
};

function normalizeRole(role) {
  return ROLE_ALIASES[role] || 'user';
}

function matchesRole(role, expectedRole) {
  return normalizeRole(role) === expectedRole;
}

function isAdminRole(role) {
  return matchesRole(role, 'admin');
}

function isDealerRole(role) {
  return matchesRole(role, 'dealer');
}

function getStoredRoles(role) {
  switch (role) {
    case 'admin':
      return ['admin', 'Admin'];
    case 'dealer':
      return ['dealer', 'ShopOwner'];
    case 'user':
      return ['user', 'Citizen'];
    default:
      return [role];
  }
}

module.exports = {
  normalizeRole,
  matchesRole,
  isAdminRole,
  isDealerRole,
  getStoredRoles,
};

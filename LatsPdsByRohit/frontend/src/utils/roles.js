const ROLE_ALIASES = {
  Citizen: 'user',
  ShopOwner: 'dealer',
  Admin: 'admin',
  user: 'user',
  dealer: 'dealer',
  admin: 'admin',
}

export function normalizeRole(role) {
  return ROLE_ALIASES[role] || 'user'
}

export function isDealerRole(role) {
  return normalizeRole(role) === 'dealer'
}

export function isAdminRole(role) {
  return normalizeRole(role) === 'admin'
}

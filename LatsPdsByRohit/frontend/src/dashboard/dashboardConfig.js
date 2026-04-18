import {
  DASHBOARD_ADMIN_ANALYTICS_ROUTE,
  DASHBOARD_ALLOCATIONS_ROUTE,
  DASHBOARD_GRIEVANCES_ROUTE,
  DASHBOARD_HISTORY_ROUTE,
  DASHBOARD_OVERVIEW_ROUTE,
  DASHBOARD_PROFILE_ROUTE,
  DASHBOARD_SETTINGS_ROUTE,
} from '../constants/routes'

export const DASHBOARD_NAV_ITEMS = [
  {
    name: 'Overview',
    icon: 'dashboard',
    href: DASHBOARD_OVERVIEW_ROUTE,
    roles: ['user', 'dealer', 'admin'],
    subtitle: 'Role summary and system status',
  },
  {
    name: 'My Allocations',
    icon: 'inventory_2',
    href: DASHBOARD_ALLOCATIONS_ROUTE,
    roles: ['user', 'admin'],
    subtitle: 'Entitlements and monthly grain ledger',
  },
  {
    name: 'Admin Analytics',
    icon: 'monitoring',
    href: DASHBOARD_ADMIN_ANALYTICS_ROUTE,
    roles: ['admin'],
    subtitle: 'Operational metrics and fraud watchlist',
  },
  {
    name: 'Transaction History',
    icon: 'history',
    href: DASHBOARD_HISTORY_ROUTE,
    roles: ['user', 'dealer'],
    subtitle: 'Collections and ration issue records',
  },
  {
    name: 'Grievances',
    icon: 'gavel',
    href: DASHBOARD_GRIEVANCES_ROUTE,
    roles: ['user', 'admin'],
    subtitle: 'Complaints, submissions, and accountability workflow',
  },
  {
    name: 'Profile',
    icon: 'person',
    href: DASHBOARD_PROFILE_ROUTE,
    roles: ['user', 'dealer', 'admin'],
    subtitle: 'Identity and contact records',
  },
  {
    name: 'Settings',
    icon: 'settings',
    href: DASHBOARD_SETTINGS_ROUTE,
    roles: ['user', 'dealer', 'admin'],
    subtitle: 'Preferences and secure access controls',
  },
]

export function getDashboardTitle(pathname) {
  const activeRoute = DASHBOARD_NAV_ITEMS.find((item) => item.href === pathname)

  if (activeRoute) {
    return activeRoute.name === 'Overview' ? 'Ration Transparency System' : activeRoute.name
  }

  return 'Dashboard'
}

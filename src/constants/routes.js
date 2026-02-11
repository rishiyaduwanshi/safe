// Application Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  REPORT: '/report',
  PROFILE: '/profile',
  ADMIN: '/admin',
  ANALYTICS: '/analytics',
  APPEALS: '/appeals',
  LOGIN: '/login',
  REGISTER: '/register',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
};

export const QUICKLINKS = [
  ["Home", "/"],
  ["Dashboard", "/dashboard"],
  ["Report", "/report"],
  ["About", "/about"]
]

export const LEGALLINKS = [
  ["Privacy Policy", "/privacy"],
  ["Terms of service", "/terms"],
  ["Contact Us", "/contact"]
]

// Navigation Menu Items
export const MENU_ITEMS = [
  { label: 'Home', path: ROUTES.HOME, icon: 'Home' },
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'BarChart3' },
  { label: 'Report Hazard', path: ROUTES.REPORT, icon: 'AlertTriangle' },
  { label: 'Profile', path: ROUTES.PROFILE, icon: 'User' },
  { label: 'About', path: ROUTES.ABOUT, icon: 'Info' },
];

// Admin Menu Items
export const ADMIN_MENU_ITEMS = [
  { label: 'Analytics', path: ROUTES.ANALYTICS, icon: 'TrendingUp' },
  { label: 'Appeals', path: ROUTES.APPEALS, icon: 'FileText' },
  { label: 'Violations', path: '/admin/violations', icon: 'AlertCircle' },
  { label: 'Users', path: '/admin/users', icon: 'Users' },
  { label: 'Reports', path: '/admin/reports', icon: 'Flag' },
];

export default ROUTES;
// Main constants exports
export { default as ROUTES, MENU_ITEMS, ADMIN_MENU_ITEMS } from './routes.js';
export { default as STRINGS } from './strings.js';
export { 
  API_CONFIG, 
  API_ENDPOINTS, 
  STORAGE_KEYS, 
  DEFAULTS, 
  FEATURES 
} from './config.js';

// Import STRINGS to re-export specific properties
import STRINGS from './strings.js';

// Re-export commonly used constants
export const { 
  VIOLATIONS, 
  SAFETY_LEVELS, 
  HAZARD_TYPES, 
  SEVERITY, 
  ERRORS, 
  SUCCESS 
} = STRINGS;
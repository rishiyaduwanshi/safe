// Application Text Content
export const STRINGS = {
  // App Info
  APP_NAME: 'S.A.F.E India',
  APP_TAGLINE: 'Smart, Adaptive & Forensic Evaluation',
  APP_DESCRIPTION: 'Making Indian roads safer through intelligent monitoring and citizen engagement',
  
  // Hero Section
  HERO_TITLE: 'Transform Road Safety with AI-Powered Intelligence',
  HERO_SUBTITLE: 'Join the revolution in road safety. Track violations, report hazards, and build a safer India together.',
  HERO_CTA_PRIMARY: 'Get Started',
  HERO_CTA_SECONDARY: 'Learn More',
  
  // Dashboard
  DASHBOARD_WELCOME: 'Welcome back',
  SAFETY_SCORE_TITLE: 'Your Safety Score',
  RECENT_ACTIVITY: 'Recent Activity',
  VIOLATIONS_DETECTED: 'Violations Detected',
  SAFE_DRIVES: 'Safe Drives',
  REPORTS_SUBMITTED: 'Reports Submitted',
  
  // Violation Types
  VIOLATIONS: {
    HELMET: 'Helmet Violation',
    SEATBELT: 'Seatbelt Violation',
    SPEEDING: 'Overspeeding',
    WRONG_SIDE: 'Wrong Side Driving',
    SIGNAL_JUMP: 'Signal Jumping',
    PARKING: 'Illegal Parking',
    PHONE_USE: 'Phone Usage While Driving',
  },
  
  // Safety Score Levels
  SAFETY_LEVELS: {
    EXCELLENT: { label: 'Excellent', min: 90, color: 'green' },
    GOOD: { label: 'Good', min: 75, color: 'blue' },
    AVERAGE: { label: 'Average', min: 60, color: 'yellow' },
    POOR: { label: 'Poor', min: 40, color: 'orange' },
    CRITICAL: { label: 'Critical', min: 0, color: 'red' },
  },
  
  // Report Form
  REPORT_TITLE: 'Report Road Hazard',
  REPORT_DESCRIPTION: 'Help make our roads safer by reporting hazards and issues',
  HAZARD_TYPES: {
    POTHOLE: 'Pothole',
    BROKEN_SIGN: 'Broken Traffic Sign',
    POOR_LIGHTING: 'Poor Street Lighting',
    ROAD_DAMAGE: 'Road Damage',
    DEBRIS: 'Road Debris',
    FLOODING: 'Water Logging',
    OTHER: 'Other',
  },
  
  // Form Labels
  LABELS: {
    LOCATION: 'Location',
    DESCRIPTION: 'Description',
    SEVERITY: 'Severity Level',
    PHOTO: 'Upload Photo',
    SUBMIT: 'Submit Report',
    CANCEL: 'Cancel',
    SAVE: 'Save',
    EDIT: 'Edit',
    DELETE: 'Delete',
    VIEW_DETAILS: 'View Details',
  },
  
  // Severity Levels
  SEVERITY: {
    LOW: { label: 'Low', color: 'green', description: 'Minor inconvenience' },
    MEDIUM: { label: 'Medium', color: 'yellow', description: 'Moderate risk' },
    HIGH: { label: 'High', color: 'orange', description: 'Significant danger' },
    CRITICAL: { label: 'Critical', color: 'red', description: 'Immediate attention required' },
  },
  
  // Status Messages
  STATUS: {
    PENDING: 'Pending Review',
    IN_PROGRESS: 'In Progress',
    RESOLVED: 'Resolved',
    REJECTED: 'Rejected',
  },
  
  // Admin Panel
  ADMIN: {
    DASHBOARD_TITLE: 'Authority Dashboard',
    TOTAL_VIOLATIONS: 'Total Violations',
    PENDING_APPEALS: 'Pending Appeals',
    ACTIVE_REPORTS: 'Active Reports',
    SAFETY_IMPROVEMENT: 'Safety Improvement',
  },
  
  // Footer
  FOOTER: {
    ABOUT: 'About S.A.F.E India',
    PRIVACY: 'Privacy Policy',
    TERMS: 'Terms of Service',
    CONTACT: 'Contact Us',
    COPYRIGHT: '© 2024 S.A.F.E India. Making roads safer for everyone.',
  },
  
  // Error Messages
  ERRORS: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    WEAK_PASSWORD: 'Password must be at least 8 characters',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    UPLOAD_FAILED: 'Failed to upload file. Please try again.',
    LOCATION_ACCESS: 'Unable to access location. Please enable location services.',
    GENERIC: 'Something went wrong. Please try again.',
  },
  
  // Success Messages
  SUCCESS: {
    REPORT_SUBMITTED: 'Report submitted successfully!',
    PROFILE_UPDATED: 'Profile updated successfully!',
    APPEAL_SUBMITTED: 'Appeal submitted for review',
    DATA_SAVED: 'Data saved successfully',
  },
};

export default STRINGS;
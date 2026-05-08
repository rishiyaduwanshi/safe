# 🚗 S.A.F.E India - Smart, Adaptive & Forensic Evaluation

A revolutionary React.js application for national road safety monitoring and driver behavior evaluation.

## 🌐 Live

- Frontend: https://safeindia.flyo.cc
- Backend API: https://api-safeindia.flyo.cc/api/v1

## ✨ Project Overview

**S.A.F.E India** combines cutting-edge AI technology with elegant user experience design to address India's massive road safety crisis. Our platform provides real-time violation detection, hazard reporting, and comprehensive driver safety scoring.

### 🎯 Key Features

- **Real-time Violation Detection** - AI-powered helmet, speed, and traffic violation monitoring
- **Citizen Safety Score (CSS)** - Dynamic scoring system for driver behavior evaluation  
- **Hazard Reporting** - Crowdsourced pothole and road hazard detection
- **Role-Based Portals** - Citizen, Moderator, and Admin workflows
- **Moderator Management (Admin)** - Create moderators, toggle active status, and manage permissions
- **Smart Analytics** - Traffic flow optimization and accident hotspot identification
- **Premium UI/UX** - Design inspired by onified.ai and ryne.ai aesthetics

### 🎨 Design Philosophy

- **Ultra-minimal Navigation** - Clean, distraction-free interface like ryne.ai
- **Bold Typography & Cards** - Impactful visual hierarchy inspired by onified.ai
- **Glassmorphism Effects** - Subtle transparency and blur effects throughout
- **Smooth Animations** - Framer Motion powered micro-interactions
- **Responsive Design** - Mobile-first approach with desktop optimization

## 🚀 Tech Stack

- **React 19.1.1** - Latest React with concurrent features
- **Vite** - Lightning-fast build tool with HMR
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Recharts** - Data visualization and analytics
- **Lucide React** - Beautiful, consistent icons
- **Bun** - Package manager / runtime for local dev scripts

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Application pages
├── layouts/       # Layout components
├── styles/        # Centralized theme system
├── constants/     # App constants and strings
├── utils/         # Utility functions
└── assets/        # Static assets
```

## 🛠️ Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## 🧠 AI-Assisted (Semi-Smart) System

This project uses AI to **assist** moderation and classification (not to fully automate approvals).

- On report submit, AI returns `key`, `severity`, `confidence` and (when needed) a short `comment`.
- **Auto-reject** happens only for extremely low confidence / insufficient detail.
- **Needs review** is used when confidence is low, so a moderator can verify.
- **Approval is never automatic** — only a moderator can approve/reject.

## 👥 Roles & Access

- **Citizen**: submits reports, tracks status, sees comments/feedback.
- **Moderator**: reviews reports in `pending/review`, approves or rejects, and can leave moderation comments.
- **Admin**: manages **moderators** (create/list/update permissions/toggle active/delete). *(Citizen user list/ban is not implemented in the current codebase.)*

### Confidence

- **Confidence is stored as 0..1** in the API and displayed as a percentage in the UI (e.g., `0.10` → `10%`).

### Comments (Transparency)

- Reports can contain **multiple comments** (AI/system/moderator/admin).
- Users can see these comments in the report detail view.
- In the user-facing UI, AI notes may be shown under **System** for simpler understanding.

## 🔁 CI/CD (High-Level)

- The backend supports GitHub Actions based deployment to a server over SSH (push to `main` triggers deploy).
- Frontend is deployed as a static build and points to the API via `VITE_API_BASE_URL`.

---

*Built for safer roads in India*

# Legal Document Management System

A confidential, AI-powered workflow tool for Florida family law firms to organize, review, and analyze client-submitted financial documents.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔐 Demo Login

- **Username:** user
- **Password:** user123

## 📁 Project Structure

```
legal-document-automation/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # Authentication routes
│   │   └── login/         # Login page
│   ├── (protected)/       # Protected routes
│   │   └── dashboard/     # Dashboard pages
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard layout & sidebar
│   ├── documents/        # Document management components
│   ├── gaps/             # Gap analysis components
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and data
│   ├── auth/            # Auth context
│   ├── mock-data/       # Mock data for all entities
│   ├── utils/           # Helper functions
│   └── types.ts         # TypeScript types
└── public/              # Static assets
```

## ✨ Features

### 🏠 Landing Page
- Professional legal firm aesthetic
- Feature showcase and benefits
- Responsive design

### 🔒 Authentication
- Mock authentication with localStorage
- Protected routes with middleware
- Session management

### 📊 Dashboard
- Overview statistics
- Recent activity feed
- Recent documents list
- Responsive sidebar navigation

### 📄 Document Management
- Drag-and-drop file upload
- Document list with sorting/filtering
- Status tracking (uploaded, processing, reviewed, flagged)
- Mock file processing simulation

### 🔍 Gap Analysis
- Visual timeline view
- Calendar view for missing documents
- Automated gap detection
- Client-specific analysis

### 📈 Reports & Analytics
- Chart.js visualizations
- Document status distribution
- Monthly upload trends
- Gap analysis by client
- Export functionality (mock)

### 🎨 UI/UX Features
- Loading states and skeletons
- Toast notifications
- Error boundaries
- Empty states
- Mobile responsive design

## 🛠️ Tech Stack

- **Framework:** Next.js 15.3.5 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3 with Flowbite components
- **State Management:** React Context API
- **Authentication:** Mock auth with localStorage
- **Charts:** Chart.js with react-chartjs-2
- **Icons:** Lucide React
- **Forms:** React Hook Form with Zod validation
- **Date Handling:** date-fns

## 📱 Pages Overview

1. **/** - Landing page
2. **/login** - Login page
3. **/dashboard** - Main dashboard
4. **/dashboard/documents** - Document list view
5. **/dashboard/upload** - Document upload interface
6. **/dashboard/gaps** - Gap analysis
7. **/dashboard/clients** - Client management
8. **/dashboard/reports** - Reports and analytics
9. **/dashboard/settings** - User settings

## 🔧 Development Notes

- All data is mocked - no backend required
- Authentication persists in localStorage
- File uploads are simulated with progress bars
- Gap detection is based on predefined mock data
- Charts use static/calculated data from mock datasets

## 📝 Mock Data Structure

- **Users:** Attorneys, paralegals, admins
- **Clients:** Active, pending, and closed cases
- **Documents:** Various financial document types
- **Gaps:** Missing statement periods
- **Activities:** System activity log

## 🚦 Status Indicators

- **Document Status:**
  - `uploaded` - Newly uploaded
  - `processing` - Being analyzed
  - `reviewed` - Completed review
  - `flagged` - Requires attention

- **Client Status:**
  - `active` - Current cases
  - `pending` - Awaiting action
  - `closed` - Completed cases

## 🎯 Future Enhancements

- Real backend integration
- Azure services integration
- AI-powered document analysis
- Real-time notifications
- Advanced reporting features
- Multi-factor authentication
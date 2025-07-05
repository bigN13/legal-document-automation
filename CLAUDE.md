# CLAUDE.md - Legal Document Management System

## Project Overview

We are building a confidential, AI-powered workflow tool for a Florida family law firm to organize, review, and analyze client-submitted financial documents. The system will help identify gaps in mandatory financial disclosures (bank and credit card statements).

### Key Features
- Secure document upload system
- AI-powered document analysis (future implementation)
- Automated gap detection for missing statements
- Clear reporting of received vs. needed documents
- Attorney-client privilege compliance

### Current Phase: MVP Frontend
- Visual interface with mock functionality
- Landing page, login system, and protected dashboard
- Mock data for all services
- No backend or Azure integration yet

## Tech Stack

### Frontend (Current Focus)
- **Framework**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS with Flowbite components
- **State Management**: React Context API
- **Authentication**: Mock auth with localStorage
- **Charts**: Chart.js for visualizations

### Backend (Future Implementation)
- **API**: C# .NET 8 Web API
- **Database**: Azure SQL Database
- **File Storage**: Azure Blob Storage
- **AI Services**: Azure OpenAI (GPT-4)
- **OCR**: Azure Form Recognizer
- **Authentication**: Azure AD B2C

## Project Structure

```
legal-doc-system/
├── frontend/                 # Next.js application
│   ├── app/
│   │   ├── api/            # Future API routes
│   │   ├── (auth)/
│   │   │   └── login/
│   │   ├── (protected)/
│   │   │   └── dashboard/
│   │   └── page.tsx        # Landing page
│   ├── components/
│   │   ├── ui/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── documents/
│   ├── lib/
│   │   ├── mock-data/
│   │   └── utils/
│   └── public/
└── backend/                 # C# .NET API (future)
    ├── API/
    ├── Core/
    ├── Infrastructure/
    └── Tests/
```

## Frontend Commands (Next.js)

### Initial Setup
```bash
# Create new Next.js project
npx create-next-app@latest legal-doc-system --typescript --tailwind --app

# Navigate to project
cd legal-doc-system

# Install dependencies
npm install flowbite flowbite-react
npm install chart.js react-chartjs-2
npm install date-fns
npm install react-hook-form zod @hookform/resolvers
npm install lucide-react
npm install clsx tailwind-merge

# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run type checking
npm run type-check
```

### Tailwind + Flowbite Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#6B7280',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
```

## Backend Commands (C# .NET)

### Initial Setup
```bash
# Create solution
dotnet new sln -n LegalDocSystem

# Create projects
dotnet new webapi -n LegalDocSystem.API
dotnet new classlib -n LegalDocSystem.Core
dotnet new classlib -n LegalDocSystem.Infrastructure
dotnet new xunit -n LegalDocSystem.Tests

# Add projects to solution
dotnet sln add LegalDocSystem.API
dotnet sln add LegalDocSystem.Core
dotnet sln add LegalDocSystem.Infrastructure
dotnet sln add LegalDocSystem.Tests

# Add project references
cd LegalDocSystem.API
dotnet add reference ../LegalDocSystem.Core
dotnet add reference ../LegalDocSystem.Infrastructure

cd ../LegalDocSystem.Infrastructure
dotnet add reference ../LegalDocSystem.Core

cd ../LegalDocSystem.Tests
dotnet add reference ../LegalDocSystem.API
dotnet add reference ../LegalDocSystem.Core

# Install common packages
cd ../LegalDocSystem.API
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package Azure.Storage.Blobs
dotnet add package Azure.AI.OpenAI --prerelease
dotnet add package Azure.AI.FormRecognizer
dotnet add package Swashbuckle.AspNetCore
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
dotnet add package FluentValidation.AspNetCore

# Development commands
dotnet build
dotnet run
dotnet watch run

# Database commands
dotnet ef migrations add InitialCreate
dotnet ef database update

# Testing
dotnet test
dotnet test --logger "console;verbosity=detailed"
```

## Implementation Tasks

### Phase 1: Project Setup & Configuration
- Initialize Next.js project with TypeScript
- Configure Tailwind CSS and Flowbite
- Set up project structure
- Create mock authentication system
- Configure protected routes

### Phase 2: Landing Page
- Hero section with law firm branding
- Features showcase
- Benefits section
- Professional legal aesthetic
- Responsive design

### Phase 3: Authentication
- Login page with Flowbite components
- Mock credentials (user/user123)
- Session management
- Protected route middleware

### Phase 4: Dashboard Layout
- Sidebar navigation
- Dashboard overview with stats
- Recent activity feed
- Responsive mobile menu

### Phase 5: Document Management
- Drag-and-drop upload interface
- Document list with filtering/sorting
- Mock document processing
- Status tracking

### Phase 6: Gap Analysis
- Visual timeline of document coverage
- Calendar view for missing months
- Gap detection simulation
- Export functionality (mock)

### Phase 7: Reports & Visualization
- Summary reports
- Chart.js visualizations
- Export options (PDF, Excel)
- Print-friendly layouts

### Phase 8: UI Polish
- Loading states
- Notifications system
- Error handling
- Empty states

## Development Guidelines

### Frontend Best Practices
1. Use TypeScript for type safety
2. Follow Next.js 14 app directory conventions
3. Implement proper error boundaries
4. Use Tailwind utility classes consistently
5. Keep components small and focused
6. Implement proper loading states
7. Use mock data realistically

### Backend Best Practices (Future)
1. Follow Clean Architecture principles
2. Use Repository pattern for data access
3. Implement proper error handling middleware
4. Use DTOs for API responses
5. Implement comprehensive logging
6. Follow SOLID principles
7. Write unit and integration tests

### Security Considerations
- Implement proper authentication
- Use HTTPS in production
- Sanitize file uploads
- Implement rate limiting
- Follow OWASP guidelines
- Ensure attorney-client privilege

## Mock Data Examples

### User Object
```typescript
{
  id: "usr_001",
  username: "user",
  email: "attorney@lawfirm.com",
  firmName: "Smith & Associates",
  role: "attorney"
}
```

### Document Object
```typescript
{
  id: "doc_001",
  clientId: "client_001",
  name: "Chase_Bank_Statement_Jan_2024.pdf",
  type: "bank_statement",
  accountNumber: "****1234",
  institution: "Chase Bank",
  startDate: "2024-01-01",
  endDate: "2024-01-31",
  uploadDate: "2024-02-15",
  status: "reviewed",
  fileSize: 245000,
  pages: 12
}
```

### Gap Object
```typescript
{
  documentId: "doc_001",
  accountNumber: "****1234",
  missingPeriod: {
    month: 2,
    year: 2024
  },
  type: "bank_statement"
}
```

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME="Legal Document System"
NEXT_PUBLIC_MOCK_MODE=true
```

### Backend (.env)
```env
ConnectionStrings__DefaultConnection=Server=...
AzureStorage__ConnectionString=...
AzureOpenAI__Endpoint=...
AzureOpenAI__ApiKey=...
JWT__Secret=...
JWT__Issuer=...
```

## Git Workflow

```bash
# Initial setup
git init
git add .
git commit -m "Initial commit"

# Feature branch workflow
git checkout -b feature/document-upload
# Make changes
git add .
git commit -m "feat: implement document upload interface"
git push origin feature/document-upload

# Common commands
git status
git diff
git log --oneline
git branch -a
git merge main
git rebase main
```

## Testing Commands

### Frontend Testing
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom

# Run tests
npm test
npm test -- --watch
npm test -- --coverage
```

### Backend Testing
```bash
# Run all tests
dotnet test

# Run with coverage
dotnet test /p:CollectCoverage=true

# Run specific test project
dotnet test LegalDocSystem.Tests

# Run in watch mode
dotnet watch test
```

## Deployment

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Backend (Azure)
```bash
# Azure CLI commands
az login
az webapp create --name legal-doc-api --resource-group rg-legal-doc
az webapp deployment source config-local-git --name legal-doc-api --resource-group rg-legal-doc

# Docker deployment
docker build -t legal-doc-api .
docker tag legal-doc-api myregistry.azurecr.io/legal-doc-api
docker push myregistry.azurecr.io/legal-doc-api
```

## Troubleshooting

### Common Next.js Issues
- Clear `.next` folder: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

### Common C# Issues
- Restore packages: `dotnet restore`
- Clean solution: `dotnet clean`
- Check for package updates: `dotnet list package --outdated`

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Flowbite Components](https://flowbite.com/docs)
- [.NET Documentation](https://docs.microsoft.com/dotnet)
- [Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai)
- [Clean Architecture](https://docs.microsoft.com/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures)

---

## Notes for Claude Code

1. Start with the frontend MVP implementation
2. Use mock data extensively to simulate real functionality
3. Focus on user experience and visual appeal
4. Keep components modular for easy backend integration
5. Document any assumptions or decisions made
6. Create realistic loading states and transitions
7. Ensure mobile responsiveness throughout
8. Follow accessibility best practices
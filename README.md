# EdTech Assignment Tracker

A comprehensive assignment tracking system for educational platforms that enables teachers to create and manage assignments while allowing students to submit their work and receive feedback.

## Features

### For Teachers
- **Assignment Management**: Create, edit, and manage assignments with detailed descriptions
- **Submission Review**: View and grade student submissions with feedback
- **Dashboard Analytics**: Track assignment statistics and student progress
- **File Management**: Support for assignment attachments and resources

### For Students
- **Assignment Viewing**: Browse available assignments with due dates and requirements
- **Submission System**: Submit assignments with text content and file attachments
- **Progress Tracking**: Monitor submission status and received grades
- **Feedback Review**: View teacher feedback and grades for submitted work

### System Features
- **Role-based Authentication**: Secure login system with teacher/student roles
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Updates**: Live status updates and notifications
- **File Upload**: Drag-and-drop file upload with multiple format support
- **Modern UI/UX**: Clean, professional interface with smooth animations

### Technology Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and building
- **State Management**: React Context API with custom hooks

### Core Entities
- **Users**: Teachers and students with role-based permissions
- **Assignments**: Created by teachers with due dates and point values
- **Submissions**: Student work submitted for assignments
- **File Attachments**: Support for various file types

### Authentication Endpoints
```
POST /api/auth/signup    - Register new user (teacher/student)
POST /api/auth/login     - User login with email/password
POST /api/auth/logout    - Invalidate user session
```

### Assignment Endpoints
```
POST /api/assignments           - Create assignment (teachers only)
GET  /api/assignments           - List assignments (role-based filtering)
PUT  /api/assignments/{id}      - Update assignment (teachers only)
GET  /api/assignments/{id}      - Get assignment details
```

### Submission Endpoints
```
POST /api/submissions              - Submit assignment (students only)
GET  /api/submissions              - List submissions (role-based)
PUT  /api/submissions/{id}/grade   - Grade submission (teachers only)
GET  /api/submissions/{id}         - Get submission details
```

### File Management
```
POST /api/files/upload    - Upload assignment files
GET  /api/files/{id}      - Download/view uploaded files
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <https://github.com/latha0001/ED-Tech>
   cd ED-Tech
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Credentials

**Teachers:**
- Email: `lathakadavath@edu.com` | Password: `teacher123`
- Email: `bhanu.priya@edu.com` | Password: `teacher123`

**Students:**
- Email: `kiran@student.edu` | Password: `student123`
- Email: `madno@student.edu` | Password: `student123`

### For Teachers

1. **Login** with teacher credentials
2. **Create Assignment**: Click "New Assignment" to create assignments with:
   - Title and detailed description
   - Due date and maximum points
   - Publication status (draft/published)
3. **View Submissions**: Click "View Submissions" on any assignment to:
   - Review student submissions
   - Provide grades and feedback
   - Track submission statistics

### For Students

1. **Login** with student credentials
2. **Browse Assignments**: View all published assignments with:
   - Assignment details and requirements
   - Due dates and point values
   - Submission status
3. **Submit Work**: Click "Submit" on assignments to:
   - Write submission content
   - Upload supporting files
   - Track submission status

### Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Adapted layouts for medium screens
- **Desktop Enhanced**: Full feature set on large screens
- **Touch Friendly**: Appropriate touch targets and gestures

### Development

### Available Scripts

```bash
npm run dev      
npm run build    
```

### Project Structure
```
src/
├── components/          # React components
│   ├── Auth/           # Authentication components
│   ├── Layout/         # Layout components
│   ├── Student/        # Student-specific components
│   └── Teacher/        # Teacher-specific components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```


### Short-term Optimizations
- Database indexing on frequently queried fields
- API response caching with Redis
- File storage optimization with CDN
- Connection pooling and query optimization
- Pagination for large data sets

### Long-term Architecture
- Microservices architecture (Auth, Assignment, File services)
- Read replicas for database scaling
- Event-driven architecture with message queues
- Container orchestration with Kubernetes
- Global CDN and edge computing for file delivery

Access the complete system design documentation by adding `?design=true` to the URL. This includes:

- Detailed system architecture diagrams
- Database schema and relationships
- Complete API endpoint documentation
- Authentication and security strategies
- Scaling recommendations and performance targets


**Built with ❤️ for educational excellence**

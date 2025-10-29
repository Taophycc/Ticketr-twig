# Ticketr - Twig/PHP Implementation

A comprehensive ticket management web application built with Twig templating engine, PHP 8, and Tailwind CSS.

## 🛠️ Technologies Used

- **PHP 8.0+** - Server-side programming
- **Twig 3.0** - Flexible, fast, and secure templating engine
- **Tailwind CSS 3.4** - Utility-first CSS framework (via CDN)
- **JSON File Storage** - Simple file-based data persistence
- **PHP Sessions** - Authentication management

## 📦 Installation & Setup

### Prerequisites
- PHP 8.0 or higher
- Composer (PHP dependency manager)
- Apache or Nginx web server (or PHP built-in server for development)

### Installation Steps

1. Navigate to the Twig project directory:
```bash
cd twig-tickets
```

2. Install dependencies via Composer:
```bash
composer install
```

3. Start the PHP development server:
```bash
php -S localhost:8000
```

4. Open your browser and visit:
```
http://localhost:8000
```

### Apache Configuration

If using Apache, ensure `.htaccess` is enabled and `mod_rewrite` is active. The included `.htaccess` file handles URL routing.

## 🚀 Available Commands

- `composer install` - Install dependencies
- `php -S localhost:8000` - Start PHP built-in server
- `composer dump-autoload` - Regenerate autoload files

## 📁 Project Structure

```
twig-tickets/
├── src/                  # PHP classes
│   ├── Router.php        # URL routing

│   ├── AuthService.php   # Authentication logic
│   └── TicketService.php # Ticket CRUD operations
├── templates/            # Twig templates
│   ├── base.twig         # Base layout
│   ├── footer.twig       # Footer component
│   ├── landing.twig      # Landing page
│   ├── login.twig        # Login page
│   ├── signup.twig       # Signup page
│   ├── dashboard.twig    # Dashboard
│   └── tickets.twig      # Ticket management
├── public/               # Static assets
│   └── css/
│       └── style.css     # Custom CSS
├── data/                 # Data storage (auto-created)
│   └── tickets.json      # Ticket data
├── vendor/               # Composer dependencies
├── index.php             # Application entry point
├── composer.json
├── .htaccess             # Apache rewrite rules
└── README.md
```

## 🎨 UI Components & Pages

### 1. Landing Page (`/`)
- Hero section with wavy SVG background
- Decorative circles and feature boxes
- Call-to-action buttons for Login and Signup
- Responsive layout with max-width 1440px

### 2. Authentication
- **Login** (`/auth/login`) - Email and password authentication
- **Signup** (`/auth/signup`) - User registration with validation
- Form validation with error messages
- Flash messages for success/error feedback
- **Logout** (`/auth/logout`) - Session destruction

### 3. Dashboard (`/dashboard`)
- Protected route (requires authentication)
- Statistics cards showing:
  - Total tickets
  - Open tickets
  - In Progress tickets
  - Resolved tickets
- Quick action buttons
- Logout functionality

### 4. Ticket Management (`/tickets`)
- Protected route (requires authentication)
- Full CRUD operations:
  - **Create**: Modal form to add new tickets (`POST /tickets/create`)
  - **Read**: Grid view of all tickets with status badges
  - **Update**: Modal form to edit existing tickets (`POST /tickets/update/{id}`)
  - **Delete**: Confirmation modal before deletion (`POST /tickets/delete/{id}`)
- Flash messages for operation feedback
- Status color coding:
  - Open: Green (`#10B981`)
  - In Progress: Amber (`#F59E0B`)
  - Closed: Gray (`#6B7280`)

## 🔐 Authentication & Security

### Session Management
- Uses `localStorage` with key: `ticketr_session`
- Token-based authentication simulation
- Protected routes redirect to login if not authenticated

### Test Credentials
**Any valid email and password combination works:**
- Email: Must contain `@` symbol
- Password: Minimum 6 characters

**Example:**
```
Email: demo@example.com
Password: password123
```

## ✅ Form Validation

### Server-Side Validation
All forms are validated on the server side:

### Login/Signup Validation
- Email format validation using PHP `filter_var()`
- Password length (minimum 6 characters)
- Password confirmation matching
- Empty field checks

### Ticket Validation
- **Title**: Required field
- **Status**: Required, must be one of: `open`, `in_progress`, `closed`
- **Description**: Optional
- **Priority**: Optional (low, medium, high), defaults to medium

## 🎨 Design System

### Colors
- Primary: `#4F46E5` (Indigo)
- Status Open: `#10B981` (Green)
- Status In Progress: `#F59E0B` (Amber)
- Status Closed: `#6B7280` (Gray)

### Layout
- Max container width: `1440px`
- Centered on large screens
- Fully responsive grid system
- Mobile-first approach

### Accessibility Features
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Focus states on interactive elements
- Color contrast compliance
- Form field labels and associations

## 💾 Data Storage

### JSON File Storage
Data is persisted in JSON files in the `data/` directory:

- `data/tickets.json` - Ticket data array

### Sample Data
The app initializes with 3 sample tickets on first run:
1. "Fix login bug" (Open, High priority)
2. "Update dashboard UI" (In Progress, Medium priority)
3. "Write documentation" (Closed, Low priority)

### Data Structure
```json
{
  "id": 1,
  "title": "Ticket title",
  "description": "Ticket description",
  "status": "open",
  "priority": "high",
  "createdAt": "2025-10-26 12:00:00"
}
```

## 🌐 Responsive Behavior

### Mobile (< 768px)
- Single column layout
- Stacked navigation
- Touch-friendly buttons
- Full-width forms

### Tablet (768px - 1024px)
- Two-column grid for tickets
- Horizontal navigation
- Optimized spacing

### Desktop (> 1024px)
- Three-column grid for tickets
- Four-column stats cards
- Full navigation bar
- Maximum width constraint (1440px)

## 🐛 Error Handling

### Types of Errors Handled
1. **Form Validation Errors**: Inline messages and toast notifications
2. **Authentication Errors**: Toast notifications
3. **CRUD Operation Errors**: Flash messages on tickets page
4. **Unauthorized Access**: Automatic redirect to login

### Flash Message System
- Success messages: Green background
- Error messages: Red background
- Auto-dismiss after 5 seconds
- Manual close button

## 📝 Routing System

### Custom Router
The application uses a custom lightweight router:

```php
$router->get('/path', function() { /* handler */ });
$router->post('/path', function() { /* handler */ });
```

### Routes
- `GET /` - Landing page
- `GET /auth/login` - Login page
- `POST /auth/login` - Process login
- `GET /auth/signup` - Signup page
- `POST /auth/signup` - Process signup
- `GET /auth/logout` - Logout
- `GET /dashboard` - Dashboard (protected)
- `GET /tickets` - Tickets list (protected)
- `POST /tickets/create` - Create ticket (protected)
- `POST /tickets/update/{id}` - Update ticket (protected)
- `POST /tickets/delete/{id}` - Delete ticket (protected)

## 🔄 Twig-Specific Features

### Template Inheritance
- Base layout (`base.twig`) with blocks
- Child templates extend base layout
- Component inclusion with `{% include %}`

### Template Syntax
- Variables: `{{ variable }}`
- Control structures: `{% if %}`, `{% for %}`
- Filters: `{{ date|date('Y-m-d') }}`
- Functions: `{{ asset('path') }}`

### Custom Twig Functions
- `asset($path)` - Generate asset URLs

## 🔄 Known Issues & Limitations

- Authentication is simulated (no real user database)
- Data persists in JSON files (not suitable for production)
- No real-time collaboration features
- No user permission system
- Limited to single-server deployments

## 🚀 Future Enhancements

- Database integration (MySQL, PostgreSQL)
- Password hashing with bcrypt
- Email verification for signup
- Password reset functionality
- User roles and permissions
- File attachments for tickets
- Comment system
- Email notifications
- Advanced filtering and search
- Data export functionality
- API endpoints for external integrations

## 📄 Production Considerations

### Security
- Enable HTTPS in production
- Implement proper password hashing
- Use environment variables for sensitive config
- Enable CSRF protection
- Implement rate limiting

### Performance
- Enable Twig template caching
- Use a proper database (PDO with MySQL/PostgreSQL)
- Implement caching layer (Redis, Memcached)
- Optimize autoloading with Composer

### Deployment
- Use Apache or Nginx in production
- Configure proper error handling
- Set up logging
- Implement backup strategy
- Use version control (Git)

## 📄 License

This is a demonstration project for educational purposes.

---

**Built with ❤️ using Twig, PHP, and Tailwind CSS**





# NabinNirmal Store

A modern, full-stack e-commerce website built with Next.js, featuring a clean design and comprehensive functionality.

## Features

### Frontend

- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Modern UI**: Clean, minimal design with shadcn/ui components
- **Product Catalog**: Browsing, filtering, and searching products
- **Shopping Cart**: Add/remove items, quantity management
- **User Authentication**: JWT-based login/signup system
- **Product Details**: Detailed product pages with images and descriptions

### Backend

- **RESTful APIs**: Built with Next.js API routes
- **Authentication**: JWT token-based auth system
- **Product Management**: CRUD operations for products
- **Order Processing**: Order management system
- **Admin Dashboard**: Administrative interface for managing store

### Admin Features

- **Product Management**: Add, edit, delete products
- **Order Management**: View and manage customer orders
- **User Management**: View registered users
- **Dashboard Analytics**: Sales and inventory overview

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, JWT Authentication
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom design system

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone <repository-url>
   cd nabinnirmal-store
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create environment file:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. Update environment variables in `.env.local`:
   \`\`\`env
   JWT_SECRET=your-super-secret-jwt-key-here
   MONGODB_URI=mongodb://localhost:27017/nabinnirmal-store
   \`\`\`

5. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Credentials

### Admin Access

- **Email**: admin@nabinnirmalstore.com
- **Password**: admin123

### Regular User

- **Email**: Any valid email
- **Password**: Any password (6+ characters)

## Project Structure

\`\`\`
nabinnirmal-store/
├── app/ # Next.js app directory
│ ├── api/ # API routes
│ │ ├── auth/ # Authentication endpoints
│ │ └── products/ # Product CRUD endpoints
│ ├── admin/ # Admin dashboard pages
│ ├── products/ # Product pages
│ ├── cart/ # Shopping cart page
│ ├── about/ # About page
│ ├── contact/ # Contact page
│ ├── login/ # Login page
│ ├── signup/ # Signup page
│ └── layout.tsx # Root layout
├── components/ # Reusable components
│ ├── ui/ # shadcn/ui components
│ ├── Header.tsx # Navigation header
│ ├── Footer.tsx # Site footer
│ ├── ProductCard.tsx # Product display component
│ └── ... # Other components
├── lib/ # Utility functions
├── hooks/ # Custom React hooks
└── public/ # Static assets
\`\`\`

## Key Features Explained

### Authentication System

- JWT-based authentication
- Role-based access control (admin/user)
- Secure password handling
- Persistent login sessions

### Product Management

- Full CRUD operations
- Image upload support
- Category-based organization
- Inventory tracking
- Search and filtering

### Shopping Cart

- Local storage persistence
- Real-time updates
- Quantity management
- Price calculations

### Admin Dashboard

- Sales analytics
- Product management interface
- Order tracking
- User management

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Products

- `GET /api/products` - Get all products (with pagination/filtering)
- `GET /api/products/[id]` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The application can be deployed on any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`env

# Required

JWT_SECRET=your-jwt-secret-key
MONGODB_URI=your-mongodb-connection-string

# Optional

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email nirmalbsccsit2@gmail.com or create an issue in the repository.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

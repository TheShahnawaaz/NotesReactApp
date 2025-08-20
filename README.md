# Notes React App

A full-stack note-keeping application built with React and Node.js that allows users to create, edit, delete, and manage their personal notes with secure authentication.

## 🌐 Live Demo

The application is deployed and accessible at:
- **Frontend**: https://notes-react-app-theshahnawaaz.vercel.app
- **Backend API**: https://notes-frontend-hug2.onrender.com

## 🚀 Features

- **User Authentication**: Secure signup/login with JWT tokens stored in HTTP-only cookies
- **Note Management**: Create, read, update, and delete personal notes
- **Responsive Design**: Built with Semantic UI React for a clean, mobile-friendly interface
- **Protected Routes**: Authenticated routes that protect user data
- **Real-time Updates**: Seamless user experience with React state management
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Server-side validation for all user inputs

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - Modern React with hooks and functional components
- **React Router DOM 6** - Client-side routing and navigation
- **Semantic UI React** - UI component library for responsive design
- **Create React App** - Development environment and build tools
- **JavaScript ES6+** - Modern JavaScript features

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling library
- **JWT (jsonwebtoken)** - Authentication token management
- **bcryptjs** - Password hashing and security
- **Cookie Parser** - HTTP cookie parsing middleware
- **CORS** - Cross-origin resource sharing configuration
- **Express Validator** - Input validation and sanitization
- **Express Rate Limit** - Rate limiting middleware
- **Morgan** - HTTP request logger
- **dotenv** - Environment variable management

## 📁 Project Structure

```
NotesReactApp/
├── my-note-keeping-app-frontend/    # React frontend application
│   ├── public/                      # Static files and HTML template
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── auth/               # Authentication components
│   │   │   ├── layout/             # Layout components (Header, Footer)
│   │   │   └── notes/              # Note management components
│   │   ├── contexts/               # React context providers
│   │   └── App.js                  # Main application component
│   └── package.json                # Frontend dependencies
│
└── note_keeping_app/               # Node.js backend API
    ├── middleware/                 # Custom middleware functions
    ├── models/                     # Mongoose data models
    ├── routes/                     # API route handlers
    ├── server.js                   # Express server configuration
    └── package.json                # Backend dependencies
```

## 🔧 Local Development Setup

### Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - [Install locally](https://docs.mongodb.com/manual/installation/) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Step 1: Clone the Repository

```bash
git clone https://github.com/TheShahnawaaz/NotesReactApp.git
cd NotesReactApp
```

### Step 2: Backend Setup

1. Navigate to the backend directory:
```bash
cd note_keeping_app
```

2. Install backend dependencies:
```bash
npm install
```

3. Create environment variables file:
```bash
touch .env
```

4. Add the following environment variables to `.env`:
```env
# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/notesapp
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notesapp

# JWT secret for token signing (use a strong, random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Server port (optional, defaults to 5000)
PORT=5000
```

5. Start the backend server:
```bash
node server.js
```

The backend server will start on `http://localhost:5000`

### Step 3: Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd my-note-keeping-app-frontend
```

2. Install frontend dependencies:
```bash
npm install
```

3. Create environment variables file (optional):
```bash
touch .env
```

4. Add the following environment variable to `.env` (optional):
```env
# Backend API URL (defaults to http://localhost:5000 if not specified)
REACT_APP_API_URL=http://localhost:5000
```

5. Start the React development server:
```bash
npm start
```

The frontend application will start on `http://localhost:3000`

### Step 4: Access the Application

1. Open your web browser and go to `http://localhost:3000`
2. Register a new account or login with existing credentials
3. Start creating and managing your notes!

## 🔗 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | No |
| GET | `/api/auth/user` | Get current user info | Yes |

### Notes Routes (`/api/notes`)

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/notes` | Get all user notes | Yes |
| GET | `/api/notes/:id` | Get specific note | Yes |
| POST | `/api/notes` | Create new note | Yes |
| PUT | `/api/notes/:id` | Update existing note | Yes |
| DELETE | `/api/notes/:id` | Delete note | Yes |

## 🗄️ Database Schema

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed)
}
```

### Note Model
```javascript
{
  user: ObjectId (reference to User),
  title: String (required),
  content: String (required),
  date: Date (default: now)
}
```

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs
- **JWT Authentication**: Secure token-based authentication
- **HTTP-Only Cookies**: Tokens stored in secure HTTP-only cookies
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Rate Limiting**: Protection against brute force login attempts
- **Input Validation**: Server-side validation for all user inputs
- **Protected Routes**: Authentication required for sensitive operations

## 🚀 Deployment

### Frontend Deployment
The frontend is configured for deployment on platforms like:
- Vercel
- Netlify
- GitHub Pages

Build the production version:
```bash
cd my-note-keeping-app-frontend
npm run build
```

### Backend Deployment
The backend can be deployed on platforms like:
- Heroku
- Railway
- Render
- AWS

Make sure to set the following environment variables in your production environment:
- `MONGODB_URI`
- `JWT_SECRET`
- `PORT` (usually set automatically by hosting platforms)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Troubleshooting

### Common Issues

1. **Backend won't start**: Make sure MongoDB is running and the connection string is correct
2. **Frontend can't connect to backend**: Check that the backend is running on port 5000 and CORS is configured
3. **Authentication not working**: Verify JWT_SECRET is set and cookies are enabled in your browser
4. **Database connection failed**: Check your MongoDB URI and ensure the database is accessible

### Getting Help

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check that both frontend and backend servers are running

## 📞 Contact

For questions or support, please contact [TheShahnawaaz](https://github.com/TheShahnawaaz).
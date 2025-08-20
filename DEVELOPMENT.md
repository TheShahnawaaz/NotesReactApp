# Development Guide

## Development Environment Setup

### Recommended Tools
- **VS Code** with extensions:
  - ES7+ React/Redux/React-Native snippets
  - Thunder Client (for API testing)
  - GitLens
  - Prettier
  - ESLint

### Development Workflow

1. **Start both servers in development mode:**
   ```bash
   # Terminal 1: Backend with auto-restart
   cd note_keeping_app
   npm run dev  # if nodemon is installed: npm install -g nodemon
   # or
   npm start
   
   # Terminal 2: Frontend with hot reload
   cd my-note-keeping-app-frontend
   npm start
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Available Scripts

#### Backend (`note_keeping_app/`)
- `npm start` - Start the server
- `npm run dev` - Start with nodemon (auto-restart on changes)

#### Frontend (`my-note-keeping-app-frontend/`)
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### API Testing

You can test the API endpoints using tools like:
- Thunder Client (VS Code extension)
- Postman
- curl commands

Example API requests:

```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get notes (requires authentication)
curl -X GET http://localhost:5000/api/notes \
  -H "Cookie: token=your_jwt_token_here"
```

### Database Operations

#### MongoDB Local Setup
```bash
# Start MongoDB service
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS

# Connect to MongoDB shell
mongosh notesapp
```

#### Useful MongoDB Commands
```javascript
// Show all users
db.users.find().pretty()

// Show all notes
db.notes.find().pretty()

// Clear all data
db.users.deleteMany({})
db.notes.deleteMany({})
```

### Code Structure

#### Frontend Components
```
src/
├── components/
│   ├── auth/           # Login, Register
│   ├── layout/         # Header, Footer, LoadingPage
│   └── notes/          # NotesList, NoteForm
├── contexts/           # AuthContext for state management
└── App.js             # Main routing component
```

#### Backend Structure
```
note_keeping_app/
├── middleware/         # Authentication middleware
├── models/            # User and Note models
├── routes/            # API route handlers
└── server.js          # Express server setup
```

### Common Development Issues

1. **CORS errors:** Make sure both frontend and backend are running on correct ports
2. **Authentication issues:** Check JWT_SECRET is set and cookies are enabled
3. **Database connection:** Verify MongoDB is running and URI is correct
4. **Port conflicts:** Change PORT in backend .env if 5000 is taken

### Contributing

1. Create a feature branch: `git checkout -b feature-name`
2. Make your changes
3. Test thoroughly
4. Submit a pull request with a clear description

### Debugging Tips

- Use browser DevTools for frontend debugging
- Add `console.log()` statements for backend debugging
- Check Network tab for API request/response details
- Monitor MongoDB logs for database issues
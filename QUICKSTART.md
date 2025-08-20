# Quick Start Guide

Get the Notes React App running in 5 minutes!

## Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

## Quick Setup

1. **Clone and setup:**
   ```bash
   git clone https://github.com/TheShahnawaaz/NotesReactApp.git
   cd NotesReactApp
   ./setup.sh
   ```

2. **Configure environment:**
   - Edit `note_keeping_app/.env`:
     ```env
     MONGODB_URI=mongodb://localhost:27017/notesapp
     JWT_SECRET=your_secret_key_here
     ```

3. **Start the application:**
   
   **Terminal 1 (Backend):**
   ```bash
   cd note_keeping_app
   npm start
   ```
   
   **Terminal 2 (Frontend):**
   ```bash
   cd my-note-keeping-app-frontend
   npm start
   ```

4. **Open your browser:** http://localhost:3000

That's it! 🚀

## Need Help?
- Check the main [README.md](README.md) for detailed instructions
- Ensure MongoDB is running
- Verify environment variables are set correctly
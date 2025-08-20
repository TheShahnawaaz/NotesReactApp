#!/bin/bash

# Notes React App - Development Setup Script
# This script sets up the development environment for both frontend and backend

echo "🚀 Setting up Notes React App development environment..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Setup Backend
echo "📦 Setting up backend dependencies..."
cd note_keeping_app

if [ ! -f "package.json" ]; then
    echo "❌ Backend package.json not found!"
    exit 1
fi

npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies!"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating backend .env file..."
    cp .env.example .env
    echo "⚠️  Please edit note_keeping_app/.env with your MongoDB URI and JWT secret!"
fi

echo "✅ Backend setup complete!"
echo ""

# Setup Frontend
echo "📦 Setting up frontend dependencies..."
cd ../my-note-keeping-app-frontend

if [ ! -f "package.json" ]; then
    echo "❌ Frontend package.json not found!"
    exit 1
fi

npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies!"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating frontend .env file..."
    cp .env.example .env
fi

echo "✅ Frontend setup complete!"
echo ""

echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Make sure MongoDB is running on your system"
echo "2. Edit note_keeping_app/.env with your MongoDB URI and JWT secret"
echo "3. Start the backend: cd note_keeping_app && npm start"
echo "4. Start the frontend: cd my-note-keeping-app-frontend && npm start"
echo "5. Open http://localhost:3000 in your browser"
echo ""
echo "Happy coding! 🚀"
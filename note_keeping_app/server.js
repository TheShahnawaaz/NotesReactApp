require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');
const cookieParser = require('cookie-parser');


const app = express(); // This needs to be defined before using app.use()
app.use(cookieParser()); // Make sure to use cookie-parser middleware


// Middleware
app.use(express.json());
// Use morgan middleware to log incoming requests
app.use(morgan('dev'));
app.use(cors({
    origin: ['http://localhost:3000', 'https://notes-frontend-hug2.onrender.com', 'https://notes-react-37i2gvoej-theshahnawaaz.vercel.app', 'https://notes-react-app-theshahnawaaz.vercel.app'],
    optionsSuccessStatus: 200,
    credentials: true
}));


// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Use the routes
app.use('/api/auth', authRoutes); // Ensure you also mount the auth routes
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');


const app = express(); // This needs to be defined before using app.use()

// Middleware
app.use(express.json());



app.use(cors({
    origin: ['http://localhost:3000', 'https://notes-frontend-hug2.onrender.com', 'https://notes-react-37i2gvoej-theshahnawaaz.vercel.app','https://notes-react-app-theshahnawaaz.vercel.app']
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

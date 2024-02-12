// App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NotesList from './components/notes/NotesList';
import NoteForm from './components/notes/NoteForm'; // Make sure to import NoteForm
import Home from './components/Home';
import { useAuth } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Container } from 'semantic-ui-react';

const App = () => {
  const { currentUser } = useAuth();

  return (
    <div className="App">

      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={currentUser ? <NotesList /> : <Navigate to="/login" />} />
          <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/" />} />
          {/* Protected Routes for NoteForm */}
          <Route path="/notes/new" element={currentUser ? <NoteForm /> : <Navigate to="/login" />} />
          <Route path="/notes/edit/:id" element={currentUser ? <NoteForm /> : <Navigate to="/login" />} />

          {/* You can add more routes as needed */}

        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;

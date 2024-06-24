import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUpPage';
import AddBookPage from './pages/AddBookPage';
import BookListPage from './pages/BookListPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Book Store</h1>
          <p>Signup</p>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/add-book" element={<AddBookPage />} />
            <Route path="/" element={<BookListPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

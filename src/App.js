import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import TramiteFormComponent from './TramiteFormComponent';
import LoginComponent from './LoginComponent';
import TramiteListComponent from './TramiteListComponent';

const App = () => {
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        // Check if token exists and is valid
        return token !== null;
    };

    const PrivateRoute = ({ children }) => {
        return isAuthenticated() ? children : <Navigate to="/login" />;
    };

    return (
        <Router>
            <div className="App">
                <h1>Formulario de Trámite</h1>
                <Routes>
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/form" element={<PrivateRoute><TramiteFormComponent /></PrivateRoute>} />
                    <Route path="/tramites" element={<PrivateRoute><TramiteListComponent /></PrivateRoute>} />
                    <Route path="/" element={<Navigate to="/form" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from './redux/userSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);

  return (
    <Router>
      {/* <ToastContainer /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={ <Dashboard /> } />
      </Routes>
    </Router>
  );
};

export default App;

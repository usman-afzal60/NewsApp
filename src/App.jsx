
import './App.css' 

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Registration from './components/Registration';
import Home from "./Home"
import Login from "./components/login"

function App() {
  
  return (  
    <Router>
      <Routes>
        {/* Define the routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<Home />} />

        {/* Redirect to login page if the path is not matched */}
        {/* <Route path="*" element={<Navigate to="/register" />} /> */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App

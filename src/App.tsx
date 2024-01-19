import React from 'react';
import './App.css';
import { DrawChart } from './components/DrawChart';
import { WorldTour } from './components/WorldTour';

import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './home/HomePage';
import { PieChart } from './components/PieChart';
import { NetworkChart } from './components/NetworkChart';

function App() {
  return (
    <Router>
      <header className="navBar">
        <span className="nav logo">
          <img src="logo192.png" alt="logo" width="50" height="50" />
        </span>
        <NavLink to="/" className="nav navButton">
          Home
        </NavLink>
        <NavLink to="/drawChart" className="nav navButton">
          Draw chart
        </NavLink>
        <NavLink to="/pieChart" className="nav navButton">
          Pie chart
        </NavLink>
        <NavLink to="/networkChart" className="nav navButton">
          Network chart
        </NavLink>
        <NavLink to="/worldTour" className="nav navButton">
          World tour
        </NavLink>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/drawChart" element={<DrawChart />} />
          <Route path="/pieChart" element={<PieChart />} />
          <Route path="/networkChart" element={<NetworkChart />} />
          <Route path="/worldTour" element={<WorldTour />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

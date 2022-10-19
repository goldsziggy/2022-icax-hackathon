import './global.css';
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="layout" id="layout">
      <header>I am inside shared layout</header>
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';

export default function Header() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-brand">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">RT</span>
          </div>
          <span>RealTrust</span>
        </a>
        
        <nav className="navbar-nav-wrapper" style={{ display: 'flex' }}>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#clients" className="nav-link">Clients</a>
          <a href="#contact" className="nav-link">Contact</a>
          <a href="/auth" className="nav-link">Admin</a>
        </nav>

        <button className="md:hidden btn btn-ghost btn-sm p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}

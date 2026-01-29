'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminSession, removeAdminSession, isAdminLoggedIn } from '@/lib/auth';
import Link from 'next/link';

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (!isAdminLoggedIn()) {
      router.push('/auth');
    } else {
      const session = getAdminSession();
      if (session) {
        setAdminName(session.name);
      }
    }
  }, [router]);

  if (!mounted) return null;

  const handleLogout = () => {
    removeAdminSession();
    router.push('/auth');
  };

  const NavLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
    <Link
      href={href}
      className="admin-nav-link group"
      title={!sidebarExpanded ? label : ''}
    >
      <svg className="admin-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icon}
      </svg>
      <span className="admin-nav-label">{label}</span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top Navigation */}
      <nav className="admin-topnav">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">RT</span>
              </div>
              <span className="font-bold text-lg">RealTrust Admin</span>
            </Link>
            <div className="flex items-center gap-6">
              <span className="text-neutral-300 text-sm">Welcome, <span className="font-semibold">{adminName}</span></span>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-ghost hover:bg-neutral-700 text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar with Hover Expand/Collapse Effect */}
        <aside 
          className={`admin-sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}
          onMouseEnter={() => setSidebarExpanded(true)}
          onMouseLeave={() => setSidebarExpanded(false)}
        >
          <nav className="admin-sidebar-nav">
            <NavLink
              href="/admin/dashboard"
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
              label="Dashboard"
            />
            <NavLink
              href="/admin/projects"
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />}
              label="Projects"
            />
            <NavLink
              href="/admin/clients"
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 8.048M15 19H9a6 6 0 0111.995-.05" />}
              label="Clients"
            />
            <NavLink
              href="/admin/contacts"
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
              label="Submissions"
            />
            <NavLink
              href="/admin/subscribers"
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.172l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5-4a2 2 0 11-4 0 2 2 0 014 0z" />}
              label="Subscribers"
            />
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`admin-main ${sidebarExpanded ? 'expanded' : 'collapsed'}`}>
          <div className="animate-slideUp">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

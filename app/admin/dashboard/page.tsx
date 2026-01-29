'use client';

import { useState, useEffect } from 'react';
import { getAdminSessionToken } from '@/lib/auth';

interface Stats {
  projects: number;
  clients: number;
  contacts: number;
  subscribers: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    clients: 0,
    contacts: 0,
    subscribers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const token = getAdminSessionToken();
      if (!token) return;

      const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

      try {
        const [projects, clients, contacts, subscribers] = await Promise.all([
          fetch(`${api}/projects`).then(r => r.json()),
          fetch(`${api}/clients`).then(r => r.json()),
          fetch(`${api}/contacts`, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
          fetch(`${api}/subscribers`, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json())
        ]);

        setStats({
          projects: projects.length || 0,
          clients: clients.length || 0,
          contacts: contacts.length || 0,
          subscribers: subscribers.length || 0
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, count, icon, color }: { title: string; count: number; icon: React.ReactNode; color: string }) => (
    <div className="card hover:card-elevated group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-neutral-500 text-sm font-semibold mb-2">{title}</p>
          <p className="text-4xl font-bold text-foreground">{count}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center opacity-80 group-hover:opacity-100 transition ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted">Welcome back! Here's your business overview.</p>
      </div>

      {loading ? (
        <div className="grid grid-3 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="card animate-pulse" style={{ height: '150px' }} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-3 gap-6 mb-12">
            <StatCard
              title="Total Projects"
              count={stats.projects}
              icon={
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              }
              color="bg-blue-100"
            />
            <StatCard
              title="Total Clients"
              count={stats.clients}
              icon={
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 8.048M15 19H9a6 6 0 0111.995-.05" />
                </svg>
              }
              color="bg-green-100"
            />
            <StatCard
              title="Contact Submissions"
              count={stats.contacts}
              icon={
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              color="bg-yellow-100"
            />
            <StatCard
              title="Newsletter Subscribers"
              count={stats.subscribers}
              icon={
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.172l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5-4a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              color="bg-purple-100"
            />
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-xl font-bold text-foreground mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="/admin/projects"
                className="flex items-center gap-4 p-4 border border-primary-200 rounded-lg hover:bg-blue-50 transition group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center group-hover:bg-blue-200 transition">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Add New Project</p>
                  <p className="text-sm text-muted">Create a new real estate project</p>
                </div>
              </a>

              <a
                href="/admin/clients"
                className="flex items-center gap-4 p-4 border border-success-light rounded-lg hover:bg-blue-50 transition group"
              >
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-blue-200 transition">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Add New Client</p>
                  <p className="text-sm text-muted">Add a client testimonial</p>
                </div>
              </a>

              <a
                href="/admin/contacts"
                className="flex items-center gap-4 p-4 border border-warning-light rounded-lg hover:bg-blue-50 transition group"
              >
                <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center group-hover:bg-blue-200 transition">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground">View Submissions</p>
                  <p className="text-sm text-muted">See contact form submissions</p>
                </div>
              </a>

              <a
                href="/admin/subscribers"
                className="flex items-center gap-4 p-4 border border-secondary-500 rounded-lg hover:bg-blue-50 transition group"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-blue-200 transition">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.172l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5-4a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground">View Subscribers</p>
                  <p className="text-sm text-muted">Manage newsletter subscribers</p>
                </div>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

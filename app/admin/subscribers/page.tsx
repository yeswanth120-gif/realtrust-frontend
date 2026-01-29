'use client';

import { useEffect, useState } from 'react';
import { fetchSubscribers } from '@/lib/api';
import { getAdminSessionToken } from '@/lib/auth';

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getAdminSessionToken();
    if (!token) return;

    fetchSubscribers(token)
      .then(setSubscribers)
      .catch(err => setError('Failed to load subscribers'))
      .finally(() => setLoading(false));
  }, []);

  const downloadCSV = () => {
    const csv = [
      'Email,Date Subscribed',
      ...subscribers.map(s => `${s.email},${new Date(s.created_at).toLocaleDateString()}`)
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Newsletter Subscribers</h1>
        <p className="text-muted">Manage your newsletter subscriber list</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-error-light border border-error rounded-lg animate-slideDown">
          <p className="text-error">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="card">
          <div className="text-center py-12">
            <p className="text-muted">Loading...</p>
          </div>
        </div>
      ) : subscribers.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-muted text-lg">No subscribers yet</p>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <h2 className="text-lg font-semibold text-foreground mb-6">Subscribers List</h2>
          
          <table className="w-full">
            <thead className="border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map(subscriber => (
                <tr key={subscriber.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition">
                  <td className="px-6 py-4 text-sm text-foreground">{subscriber.email}</td>
                  <td className="px-6 py-4 text-sm text-muted">
                    {new Date(subscriber.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-200 rounded-b-lg">
            <p className="text-sm text-foreground">
              Total subscribers: <span className="font-semibold text-primary-600">{subscribers.length}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

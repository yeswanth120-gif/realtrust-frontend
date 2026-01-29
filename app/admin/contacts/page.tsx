'use client';

import { useEffect, useState } from 'react';
import { fetchContacts } from '@/lib/api';
import { getAdminSessionToken } from '@/lib/auth';

interface Contact {
  id: string;
  full_name: string;
  email: string;
  mobile: string;
  city: string;
  created_at: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getAdminSessionToken();
    if (!token) return;

    fetchContacts(token)
      .then(setContacts)
      .catch(err => setError('Failed to load contacts'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Contact Form Submissions</h1>
        <p className="text-muted">View and manage contact form submissions from your website</p>
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
      ) : contacts.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-muted text-lg">No contact submissions yet</p>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <h2 className="text-lg font-semibold text-foreground mb-6">Submissions</h2>
          <table className="w-full">
            <thead className="border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Mobile</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">City</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition">
                  <td className="px-6 py-4 text-sm text-foreground">{contact.full_name}</td>
                  <td className="px-6 py-4 text-sm text-muted">{contact.email}</td>
                  <td className="px-6 py-4 text-sm text-muted">{contact.mobile}</td>
                  <td className="px-6 py-4 text-sm text-muted">{contact.city}</td>
                  <td className="px-6 py-4 text-sm text-muted">
                    {new Date(contact.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-200 rounded-b-lg">
            <p className="text-sm text-foreground">
              Total submissions: <span className="font-semibold text-primary-600">{contacts.length}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

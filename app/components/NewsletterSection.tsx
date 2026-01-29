'use client';

import { useState } from 'react';
import { subscribeNewsletter } from '@/lib/api';
import { validateEmail } from '@/lib/validation';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await subscribeNewsletter(email);
      setSuccess(true);
      setEmail('');
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to subscribe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-700" />
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0dGVybiBieD0iMCIgeT0iMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIiBmaWxsPSIjZmZmIi8+PC9wYXR0ZXJuPjwvc3ZnPg==')]" />
      <div className="container relative z-10 max-w-3xl">
        <div className="text-center mb-3 px-4 py-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-1">Stay Updated</h2>
          <p className="text-sm text-white/90 mb-4">
            Subscribe to our newsletter for exclusive offers and the latest project updates.
          </p>

        <form onSubmit={handleSubmit} className="flex gap-2 items-center max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input flex-1 text-xs py-2 px-3"
            style={{ minHeight: '36px' }}
          />
          <button
            type="submit"
            disabled={loading}
            className="btn btn-secondary whitespace-nowrap px-4 text-xs py-2"
            style={{ minHeight: '36px' }}
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {success && (
          <p className="text-center text-white mt-2 text-xs font-semibold animate-fadeIn">✓ Thank you for subscribing!</p>
        )}
        {error && (
          <p className="text-center text-error-light mt-2 text-xs animate-fadeIn">{error}</p>
        )}
        </div>
      </div>
    </section>
  );
}

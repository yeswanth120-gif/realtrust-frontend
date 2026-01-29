'use client';

import { useState, useEffect } from 'react';
import { setAdminSession, removeAdminSession, isAdminLoggedIn } from '@/lib/auth';
import { adminLogin } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAdminLoggedIn()) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }
    try {
      const data = await adminLogin(email, password);

      if (data.success) {
        setAdminSession({
          sessionToken: data.sessionToken,
          adminId: data.admin.id,
          email: data.admin.email,
          name: data.admin.name
        });
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Failed to authenticate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-neutral-50">
      {/* Back Button */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-foreground hover:text-primary-600 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-medium">Back</span>
      </Link>

      <div className="w-full max-w-md">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-secondary-600/20 blur-3xl opacity-50 -z-10" />

        <div className="card shadow-lg border-0">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-700 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white font-bold text-2xl">RT</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
            <p className="text-muted">Sign in to manage your projects</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-error mb-6">
              <span>✕</span>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6 mb-6">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@realtrust.com"
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="pt-6 border-t border-neutral-200">
            <p className="text-center text-xs text-muted mb-3">Demo Credentials</p>
            <div className="bg-neutral-50 rounded-lg p-4 space-y-2">
              <p className="text-sm"><span className="font-semibold text-neutral-700">Email:</span> <code className="text-primary-600 font-mono">admin@realtrust.com</code></p>
              <p className="text-sm"><span className="font-semibold text-neutral-700">Password:</span> <code className="text-primary-600 font-mono">Admin@123</code></p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted mt-6">
          © {new Date().getFullYear()} RealTrust Admin. All rights reserved.
        </p>
      </div>
    </div>
  );
}

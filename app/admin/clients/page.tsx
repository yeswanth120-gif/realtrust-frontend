'use client';

import { useState } from 'react';
import { getAdminSessionToken } from '@/lib/auth';
import { createClient } from '@/lib/api';

export default function AddClient() {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    description: ''
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.designation || !formData.description || !image) {
      setError('Please fill in all fields');
      return;
    }

    const token = getAdminSessionToken();
    if (!token) {
      setError('Authentication required');
      return;
    }

    setLoading(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('designation', formData.designation);
      formDataObj.append('description', formData.description);
      formDataObj.append('image', image);

      await createClient(formDataObj, token);

      setSuccess(true);
      setFormData({ name: '', designation: '', description: '' });
      setImage(null);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to create client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-6">
      <div className="w-full max-w-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Add New Client</h1>
          <p className="text-muted">Add a new client testimonial to showcase on your website</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
          {success && (
            <div className="mb-6 p-4 bg-success-light border border-success rounded-lg animate-slideDown">
              <p className="text-success font-semibold">✓ Client added successfully!</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-error-light border border-error rounded-lg animate-slideDown">
              <p className="text-error">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="block font-semibold text-foreground mb-2">Client Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter client name"
              className="input"
            />
          </div>

          <div className="form-group">
            <label className="block font-semibold text-foreground mb-2">Designation *</label>
            <input
              type="text"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              placeholder="e.g., CEO, Manager, etc."
              className="input"
            />
          </div>

          <div className="form-group">
            <label className="block font-semibold text-foreground mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter client testimonial or description"
              rows={5}
              className="textarea"
            />
          </div>

          <div className="form-group">
            <label className="block font-semibold text-foreground mb-2">Client Image *</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="input cursor-pointer"
            />
            <p className="text-sm text-foreground-muted mt-2">Image will be auto-cropped to 450x350</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full py-3 font-semibold"
          >
            {loading ? 'Adding...' : 'Add Client'}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}

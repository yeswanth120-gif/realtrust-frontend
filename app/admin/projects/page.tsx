'use client';

import { useState } from 'react';
import { getAdminSessionToken } from '@/lib/auth';
import { createProject } from '@/lib/api';

export default function AddProject() {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.description || !image) {
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
      formDataObj.append('description', formData.description);
      formDataObj.append('image', image);

      await createProject(formDataObj, token);

      setSuccess(true);
      setFormData({ name: '', description: '' });
      setImage(null);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-6">
      <div className="w-full max-w-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Add New Project</h1>
          <p className="text-muted">Create a new real estate project listing</p>
        </div>

        <div className="card">
          {success && (
            <div className="alert alert-success mb-6">
              <span>✓</span>
              <div>
                <p className="font-semibold">Success!</p>
                <p className="text-sm">Project created successfully!</p>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-error mb-6">
              <span>✕</span>
              <div>
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label>Project Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Luxury Downtown Apartment Complex"
                className="input"
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your project in detail..."
                rows={6}
                className="textarea"
              />
            </div>

            <div className="form-group">
              <label>Project Image *</label>
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-primary-500 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="hidden"
                  id="image-input"
                />
                <label htmlFor="image-input" className="cursor-pointer">
                  <svg className="w-12 h-12 text-neutral-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-foreground font-semibold mb-1">{image ? image.name : 'Click to upload image'}</p>
                  <p className="text-sm text-muted">PNG, JPG up to 10MB (will be resized to 450x350)</p>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? 'Creating Project...' : 'Create Project'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

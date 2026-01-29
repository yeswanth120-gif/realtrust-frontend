'use client';

import { useState } from 'react';
import { submitContact } from '@/lib/api';
import { validateForm } from '@/lib/validation';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    mobile: '',
    city: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      await submitContact(formData);
      setSuccess(true);
      setFormData({ full_name: '', email: '', mobile: '', city: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container container-md">
        <div className="text-center mb-12">
          <span className="badge badge-primary mb-4">Contact Us</span>
          <h2 className="mb-4">Get In Touch</h2>
          <p className="text-lg text-muted">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="card">
          {success && (
            <div className="alert alert-success mb-6">
              <span>✓</span>
              <div>
                <p className="font-semibold">Success!</p>
                <p className="text-sm">Thank you! We'll be in touch soon.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`input ${errors.full_name ? 'input-error' : ''}`}
              />
              {errors.full_name && <p className="input-help error">{errors.full_name}</p>}
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={`input ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <p className="input-help error">{errors.email}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className={`input ${errors.mobile ? 'input-error' : ''}`}
                />
                {errors.mobile && <p className="input-help error">{errors.mobile}</p>}
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                  className={`input ${errors.city ? 'input-error' : ''}`}
                />
                {errors.city && <p className="input-help error">{errors.city}</p>}
              </div>
            </div>

            {errors.submit && (
              <div className="alert alert-error">
                <span>✕</span>
                <p>{errors.submit}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

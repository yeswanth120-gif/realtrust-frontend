'use client';

import { useEffect, useState } from 'react';
import { fetchClients } from '@/lib/api';

interface Client {
  id: string;
  name: string;
  designation: string;
  description: string;
  image_url: string;
  created_at: string;
}

export default function ClientsSection() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients()
      .then(data => {
        console.log('Clients fetched:', data);
        setClients(data);
      })
      .catch(err => console.error('Failed to load clients:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="clients" className="section section-dark pt-24">
      <div className="container">
        <div className="text-center mb-24">
          <span className="badge badge-primary mb-4">Testimonials</span>
          <h2 className="mb-4">Our Satisfied Clients</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Success stories from property owners and investors
          </p>
        </div>
        <br/>
        {loading ? (
          <div className="flex justify-center">
            <div className="flex gap-8 pb-4 overflow-x-auto snap-x snap-mandatory" style={{maxWidth: '100%'}}>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex-shrink-0 w-56 bg-white rounded-lg p-6 shadow-lg text-center">
                  <div className="w-32 h-32 rounded-full bg-neutral-300 mx-auto mb-4 animate-pulse" />
                  <div className="h-3 bg-neutral-300 rounded mb-3 w-full" />
                  <div className="h-3 bg-neutral-300 rounded mb-3 w-4/5 mx-auto" />
                  <div className="h-4 bg-neutral-300 rounded mb-2 w-3/4 mx-auto" />
                  <div className="h-3 bg-neutral-300 rounded w-2/3 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-subtle">No clients available yet</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="flex gap-8 pb-4 overflow-x-auto snap-x snap-mandatory" style={{maxWidth: '100%', scrollBehavior: 'smooth'}}>
              {clients.map(client => (
                <div
                  key={client.id}
                  className="flex-shrink-0 w-56 bg-white rounded-lg p-6 shadow-lg text-center group"
                >
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary-200 shadow-md bg-neutral-200 flex items-center justify-center">
                    <img
                      src={client.image_url || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3C/svg%3E'}
                      alt={client.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div 
                      className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center"
                      id={`fallback-${client.id}`}
                    >
                      <span className="text-white font-bold text-3xl">{client.name.charAt(0).toUpperCase()}</span>
                    </div>
                  </div>
                  <p className="text-muted text-sm leading-relaxed line-clamp-3 mb-4">{client.description}</p>
                  <h3 className="text-base font-semibold mb-1 line-clamp-1 text-dark">{client.name}</h3>
                  <p className="text-primary-600 font-semibold text-xs">{client.designation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

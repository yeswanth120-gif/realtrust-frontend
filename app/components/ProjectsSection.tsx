'use client';

import { useEffect, useState } from 'react';
import { fetchProjects } from '@/lib/api';

interface Project {
  id: string;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(err => console.error('Failed to load projects:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="section pt-24">
      <div className="container">
        <div className="text-center mb-24">
          <span className="badge badge-primary mb-4">Our Portfolio</span>
          <h2 className="mb-4">Our Premium Projects</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Showcase of our most successful real estate developments
          </p>
        </div>
        <br/>
        {loading ? (
          <div className="flex justify-center">
            <div className="flex gap-8 pb-4 overflow-x-auto snap-x snap-mandatory" style={{maxWidth: '100%'}}>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex-shrink-0 w-56 bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="h-40 bg-neutral-300 animate-pulse" />
                  <div className="p-4">
                    <div className="h-4 bg-neutral-300 rounded mb-2 w-3/4" />
                    <div className="h-3 bg-neutral-300 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-subtle">No projects available yet</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="flex gap-8 pb-4 overflow-x-auto snap-x snap-mandatory" style={{maxWidth: '100%', scrollBehavior: 'smooth'}}>
              {projects.map(project => (
                <div
                  key={project.id}
                  className="flex-shrink-0 w-56 bg-white rounded-lg shadow-lg overflow-hidden group"
                >
                  <div className="relative h-40 overflow-hidden bg-neutral-200">
                    <img
                      src={project.image_url}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 font-semibold text-sm text-dark line-clamp-1">{project.name}</h3>
                    <p className="text-muted text-xs line-clamp-2">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

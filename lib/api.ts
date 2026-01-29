const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchProjects() {
  const res = await fetch(`${API_URL}/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function createProject(formData: FormData, token: string) {
  const res = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  if (!res.ok) throw new Error('Failed to create project');
  return res.json();
}

export async function fetchClients() {
  const res = await fetch(`${API_URL}/clients`);
  if (!res.ok) throw new Error('Failed to fetch clients');
  return res.json();
}

export async function createClient(formData: FormData, token: string) {
  const res = await fetch(`${API_URL}/clients`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  if (!res.ok) throw new Error('Failed to create client');
  return res.json();
}

export async function submitContact(data: {
  full_name: string;
  email: string;
  mobile: string;
  city: string;
}) {
  const res = await fetch(`${API_URL}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to submit contact');
  return res.json();
}

export async function fetchContacts(token: string) {
  const res = await fetch(`${API_URL}/contacts`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch contacts');
  return res.json();
}

export async function subscribeNewsletter(email: string) {
  const res = await fetch(`${API_URL}/subscribers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  if (!res.ok) throw new Error('Failed to subscribe');
  return res.json();
}

export async function fetchSubscribers(token: string) {
  const res = await fetch(`${API_URL}/subscribers`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch subscribers');
  return res.json();
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Failed to login');
  return res.json();
}

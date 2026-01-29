export function setAdminSession(sessionData: { sessionToken: string; adminId: string; email: string; name: string }) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminSession', JSON.stringify(sessionData));
  }
}

export function getAdminSession() {
  if (typeof window !== 'undefined') {
    const session = localStorage.getItem('adminSession');
    return session ? JSON.parse(session) : null;
  }
  return null;
}

export function removeAdminSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminSession');
  }
}

export function isAdminLoggedIn(): boolean {
  return getAdminSession() !== null;
}

export function getAdminSessionToken(): string | null {
  const session = getAdminSession();
  return session?.sessionToken || null;
}

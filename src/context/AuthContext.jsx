import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { SEED_USERS } from '../data/seedExtended';
import { ensureSeed, loadJson, removeJson, saveJson } from '../lib/storage';
import { appendAudit } from '../lib/auditTrail';

const SESSION_KEY = 'session';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  ensureSeed('users', () => SEED_USERS);

  const [session, setSession] = useState(() => loadJson(SESSION_KEY, null));

  const login = useCallback((email, password) => {
    const users = loadJson('users', SEED_USERS);
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { ok: false, error: 'Invalid credentials' };
    const next = { id: user.id, name: user.name, email: user.email, role: user.role };
    saveJson(SESSION_KEY, next);
    setSession(next);
    appendAudit({
      action: 'login',
      entityType: 'auth',
      entityId: user.id,
      summary: 'User signed in',
      user: user.name,
    });
    return { ok: true, user: next };
  }, []);

  const logout = useCallback(() => {
    if (session) {
      appendAudit({
        action: 'logout',
        entityType: 'auth',
        entityId: session.id,
        summary: 'User signed out',
        user: session.name,
      });
    }
    removeJson(SESSION_KEY);
    setSession(null);
  }, [session]);

  const value = useMemo(
    () => ({
      user: session,
      isAuthenticated: Boolean(session),
      login,
      logout,
      demoUsers: SEED_USERS.map(({ password, ...rest }) => ({ ...rest, hint: password })),
    }),
    [session, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

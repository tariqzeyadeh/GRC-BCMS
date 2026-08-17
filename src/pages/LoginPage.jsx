import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import dtLogo from '../assets/dt-logo.png';

const LoginPage = () => {
  const { t, i18n } = useTranslation('grc');
  const { login, isAuthenticated, demoUsers } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@aegis.local');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isRtl = i18n.language?.startsWith('ar');

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (isAuthenticated) return <Navigate to="/" replace />;

  const onSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    await new Promise(r => setTimeout(r, 420));
    const res = login(email.trim(), password);
    if (!res.ok) {
      setError(t('Invalid credentials'));
      setSubmitting(false);
      return;
    }
    navigate('/', { replace: true });
  };

  return (
    <div className={`login-page ${mounted ? 'is-ready' : ''} ${isRtl ? 'is-rtl' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="login-aurora" aria-hidden="true">
        <span className="login-orb login-orb-a" />
        <span className="login-orb login-orb-b" />
        <span className="login-orb login-orb-c" />
        <span className="login-grid" />
      </div>

      <div className="login-shell">
        <section className="login-brand-panel">
          <div className="login-brand-inner">
            <div className="login-logo-wrap">
              <span className="login-logo-ring" aria-hidden="true" />
              <span className="login-logo-ring login-logo-ring-delay" aria-hidden="true" />
              <img src={dtLogo} alt="Devoteam" className="login-logo" />
            </div>

            <p className="login-eyebrow">
              <Sparkles size={14} aria-hidden="true" />
              GRC · BCMS
            </p>
            <h1 className="login-headline">{t('Governance with clarity')}</h1>
            <p className="login-subhead">
              {t('One workspace for risk, compliance, continuity, and audit — ready when disruption hits.')}
            </p>

            <ul className="login-pillars" aria-label={t('Platform pillars')}>
              {[t('Risk'), t('Compliance'), t('Continuity'), t('Audit')].map((label, i) => (
                <li key={label} style={{ '--i': i }}>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="login-form-panel">
          <div className="login-card">
            <div className="login-card-head">
              <img src={dtLogo} alt="" className="login-card-mark" />
              <div>
                <h2 className="login-card-title">{t('Sign in')}</h2>
              </div>
            </div>

            <form className="login-form" onSubmit={onSubmit} noValidate>
              <label className="login-field" htmlFor="login-email">
                <span>{t('Email')}</span>
                <div className="login-input-wrap">
                  <Mail size={16} aria-hidden="true" />
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="username"
                    placeholder={t('name@company.com')}
                  />
                </div>
              </label>

              <label className="login-field" htmlFor="login-password">
                <span>{t('Password')}</span>
                <div className="login-input-wrap">
                  <Lock size={16} aria-hidden="true" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="login-eye"
                    onClick={() => setShowPassword(v => !v)}
                    aria-label={showPassword ? t('Hide password') : t('Show password')}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>

              {error && (
                <p className="login-error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="login-submit" disabled={submitting}>
                <span>{submitting ? t('Signing in…') : t('Sign in')}</span>
                <ArrowRight size={18} className="login-submit-arrow" aria-hidden="true" />
              </button>
            </form>

            <div className="login-demos">
              <p className="login-demos-label">{t('Demo accounts')}</p>
              <div className="login-demo-list">
                {demoUsers.map((u, i) => (
                  <button
                    key={u.id}
                    type="button"
                    className="login-demo-chip"
                    style={{ '--i': i }}
                    onClick={() => {
                      setEmail(u.email);
                      setPassword(u.hint);
                      setError('');
                    }}
                  >
                    <span className="login-demo-name">{u.name}</span>
                    <span className="login-demo-meta">{t(u.role)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;

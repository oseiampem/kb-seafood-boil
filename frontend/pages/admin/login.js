import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { loginAdmin } from '../../lib/api';
import toast from 'react-hot-toast';
import { FaFire, FaLock, FaEnvelope } from 'react-icons/fa';

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('kb_admin_token');
    if (token) router.replace('/admin/dashboard');
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginAdmin(form);
      localStorage.setItem('kb_admin_token', data.token);
      toast.success('Welcome back, Admin!');
      router.push('/admin/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Check your credentials.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login — KB's Seafood Boil</title>
      </Head>

      <div className="min-h-screen bg-ember flex items-center justify-center px-4">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fire-700/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-fire-gradient mb-4 shadow-xl shadow-fire-900/50">
              <FaFire className="text-white text-2xl" />
            </div>
            <h1 className="font-display font-bold text-white text-2xl">KB's Seafood Boil</h1>
            <p className="text-white/40 text-sm mt-1">Admin Dashboard</p>
          </div>

          {/* Card */}
          <div className="card p-8">
            <h2 className="text-white font-semibold text-xl mb-6">Sign In</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-white/60 text-sm mb-1.5 font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    placeholder="admin@kbseafood.com"
                    className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-fire-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-1.5 font-medium">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-fire-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-white/20 text-xs mt-6">
            Restricted access — authorised personnel only
          </p>
        </motion.div>
      </div>
    </>
  );
}

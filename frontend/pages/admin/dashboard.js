import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { getOrders, updateOrderStatus, deleteOrder, verifyToken } from '../../lib/api';
import toast from 'react-hot-toast';
import {
  FaFire, FaSignOutAlt, FaSync, FaTrash, FaEye,
  FaTimes, FaSearch, FaFilter,
} from 'react-icons/fa';

// ── Constants ─────────────────────────────────────────────────────────────────
const STATUS_OPTIONS = ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'];

const STATUS_STYLES = {
  pending:   'bg-yellow-900/40 text-yellow-300 border border-yellow-700/40',
  confirmed: 'bg-blue-900/40 text-blue-300 border border-blue-700/40',
  preparing: 'bg-orange-900/40 text-orange-300 border border-orange-700/40',
  delivered: 'bg-green-900/40 text-green-300 border border-green-700/40',
  cancelled: 'bg-red-900/40 text-red-300 border border-red-700/40',
};

const formatPrice = (p) => `GH₵${(p || 0).toLocaleString()}`;
const formatDate = (d) =>
  new Date(d).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

// ── Order detail modal ────────────────────────────────────────────────────────
function OrderModal({ order, onClose, onStatusChange }) {
  const [updating, setUpdating] = useState(false);

  const handleStatus = async (status) => {
    setUpdating(true);
    try {
      await onStatusChange(order._id, status);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#120600] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-white font-bold text-lg">{order.customerName}</h3>
                <p className="text-white/40 text-xs mt-0.5">{formatDate(order.createdAt)}</p>
              </div>
              <button onClick={onClose} className="text-white/40 hover:text-white transition-colors p-1">
                <FaTimes />
              </button>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Phone', value: order.phone },
                { label: 'Location', value: order.location },
                { label: 'Total', value: formatPrice(order.totalAmount) },
                { label: 'Status', value: order.status },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/5 rounded-xl p-3">
                  <p className="text-white/40 text-xs mb-1">{label}</p>
                  <p className={`text-sm font-medium ${label === 'Status' ? STATUS_STYLES[value]?.replace(/bg-\S+|border-\S+/g, '') : 'text-white'}`}>
                    {label === 'Status' ? (
                      <span className={`status-badge ${STATUS_STYLES[value]}`}>{value}</span>
                    ) : value}
                  </p>
                </div>
              ))}
            </div>

            {/* Order items */}
            <div className="mb-6">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Order Items</p>
              <div className="space-y-2">
                {order.orderItems.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm py-2 border-b border-white/5 last:border-0">
                    <span className="text-white/80">
                      {item.name}
                      {item.quantity > 1 && <span className="text-white/40 ml-1">×{item.quantity}</span>}
                    </span>
                    <span className="text-fire-400 font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            {order.instructions && (
              <div className="mb-6 p-3 bg-white/5 rounded-xl">
                <p className="text-white/40 text-xs mb-1">Special Instructions</p>
                <p className="text-white/70 text-sm">{order.instructions}</p>
              </div>
            )}

            {/* Status controls */}
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatus(s)}
                    disabled={updating || order.status === s}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all disabled:opacity-50 disabled:cursor-not-allowed
                      ${order.status === s
                        ? `${STATUS_STYLES[s]} ring-2 ring-white/20`
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
 
  const alertSound = useRef(null)

  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');
  const [stats, setStats] = useState({ total: 0, pending: 0, revenue: 0 });

  // Auth guard
  useEffect(() => {
    verifyToken().catch(() => {
      localStorage.removeItem('kb_admin_token');
      router.replace('/admin/login');
    });
  }, [router]);

  useEffect(() => {
  alertSound.current = new Audio("/alert.mp3");
}, []);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = filterStatus ? { status: filterStatus } : {};
      const { data } = await getOrders(params);
      const list = data.data || [];
      setOrders(list);

      if (alertSound.current) {
        alertSound.current.play();
      }
      setStats({
        total: list.length,
        pending: list.filter((o) => o.status === 'pending').length,
        revenue: list
          .filter((o) => o.status === 'delivered')
          .reduce((s, o) => s + (o.totalAmount || 0), 0),
      });
    } catch {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      toast.success(`Order marked as ${status}`);
      setOrders((prev) => prev.map((o) => o._id === id ? { ...o, status } : o));
      if (selectedOrder?._id === id) setSelectedOrder((o) => ({ ...o, status }));
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this order? This cannot be undone.')) return;
    try {
      await deleteOrder(id);
      toast.success('Order deleted');
      setOrders((prev) => prev.filter((o) => o._id !== id));
      if (selectedOrder?._id === id) setSelectedOrder(null);
    } catch {
      toast.error('Failed to delete order');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('kb_admin_token');
    router.push('/admin/login');
  };

  const filtered = orders.filter((o) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      o.customerName?.toLowerCase().includes(q) ||
      o.phone?.includes(q) ||
      o.location?.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <Head>
        <title>Admin Dashboard — KB's Seafood Boil</title>
      </Head>

      <div className="min-h-screen bg-ember">
        {/* Top bar */}
        <header className="bg-black/40 border-b border-white/10 px-4 py-4 sticky top-0 z-40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FaFire className="text-fire-500 text-xl" />
              <div>
                <h1 className="text-white font-bold text-sm md:text-base leading-none">
                  KB's Seafood Boil
                </h1>
                <p className="text-white/40 text-xs">Admin Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchOrders}
                className="p-2 text-white/50 hover:text-white transition-colors"
                title="Refresh"
              >
                <FaSync className={loading ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <FaSignOutAlt /> <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Orders', value: stats.total, color: 'text-white' },
              { label: 'Pending', value: stats.pending, color: 'text-yellow-400' },
              { label: 'Revenue (Delivered)', value: formatPrice(stats.revenue), color: 'text-green-400' },
              { label: 'Showing', value: filtered.length, color: 'text-fire-400' },
            ].map(({ label, value, color }) => (
              <div key={label} className="card p-5">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{label}</p>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, phone, location..."
                className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-white/25 focus:outline-none focus:border-fire-500 transition-colors text-sm"
              />
            </div>
            <div className="relative">
              <FaFilter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white/5 border border-white/15 rounded-xl pl-9 pr-8 py-2.5 text-white focus:outline-none focus:border-fire-500 transition-colors text-sm appearance-none min-w-[160px]"
              >
                <option value="" className="bg-ember">All Statuses</option>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s} className="bg-ember capitalize">{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Orders table */}
          <div className="card overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <svg className="animate-spin h-8 w-8 text-fire-500" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24 text-white/30">
                <p className="text-4xl mb-3">🦞</p>
                <p>No orders found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      {['Customer', 'Phone', 'Location', 'Items', 'Total', 'Status', 'Date', 'Actions'].map((h) => (
                        <th
                          key={h}
                          className="text-left text-white/40 text-xs uppercase tracking-widest px-4 py-3 font-medium whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((order) => (
                      <motion.tr
                        key={order._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-b border-white/5 hover:bg-white/3 transition-colors group"
                      >
                        <td className="px-4 py-3 text-white font-medium">{order.customerName}</td>
                        <td className="px-4 py-3 text-white/60">{order.phone}</td>
                        <td className="px-4 py-3 text-white/60 max-w-[140px] truncate">{order.location}</td>
                        <td className="px-4 py-3 text-white/60">{order.orderItems.length} item(s)</td>
                        <td className="px-4 py-3 text-fire-400 font-semibold">{formatPrice(order.totalAmount)}</td>
                        <td className="px-4 py-3">
                          <span className={`status-badge ${STATUS_STYLES[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-white/40 whitespace-nowrap text-xs">{formatDate(order.createdAt)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="p-1.5 text-white/40 hover:text-fire-400 transition-colors"
                              title="View details"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => handleDelete(order._id)}
                              className="p-1.5 text-white/40 hover:text-red-400 transition-colors"
                              title="Delete order"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Order detail modal */}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitOrder } from '../lib/api';
import toast from 'react-hot-toast';
import { FaFire, FaTrash, FaWhatsapp } from 'react-icons/fa';

const formatPrice = (p) => `GH₵${p.toLocaleString()}`;

export default function OrderForm({ cart, setCart }) {
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    location: '',
    instructions: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const total = cart.reduce((s, c) => s + c.price * c.quantity, 0);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const removeFromCart = (id) => setCart((prev) => prev.filter((c) => c.id !== id));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error('Please add at least one item from the menu.');
      return;
    }

    setLoading(true);
    try {
      const orderItems = cart.map(({ name, price, quantity }) => ({ name, price, quantity }));
      await submitOrder({ ...form, orderItems });

      toast.success('Order placed! We will contact you within 24 hours.');
      setSubmitted(true);
      setCart([]);
      setForm({ customerName: '', phone: '', location: '', instructions: '' });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        'Something went wrong. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="order" className="py-24 px-4">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-12"
          >
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-2xl font-display font-bold text-white mb-4">Order Received!</h3>
            <p className="text-white/60 mb-6">
              Thank you! We'll confirm your order via WhatsApp within 24 hours.
            </p>
            <a
              href={`https://wa.me/233533856150?text=${encodeURIComponent("Hi KB's Seafood Boil! I just placed an order and would like to confirm.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              <FaWhatsapp /> Message Us on WhatsApp
            </a>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-fire-400 text-sm hover:text-fire-300 transition-colors"
            >
              Place another order
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="py-24 px-4 bg-black/20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-subtitle">Ready to Eat?</p>
          <h2 className="section-title">Place Your Order</h2>
          <p className="text-white/50 mt-4">
            Fill in your details below. We'll confirm via WhatsApp within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order summary */}
          <div className="card p-6">
            <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
              <FaFire className="text-fire-500" /> Your Order
            </h3>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white/40 text-sm mb-4">No items added yet.</p>
                <a href="#menu" className="text-fire-400 text-sm hover:text-fire-300 transition-colors">
                  Browse the menu ↑
                </a>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6 max-h-72 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 py-2 border-b border-white/10 last:border-0"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{item.name}</p>
                        <p className="text-white/40 text-xs">
                          {formatPrice(item.price)} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-fire-400 text-sm font-semibold whitespace-nowrap">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-white/30 hover:text-red-400 transition-colors ml-1"
                        aria-label="Remove item"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/20 flex justify-between">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-fire-400 font-bold text-lg">{formatPrice(total)}</span>
                </div>
              </>
            )}
          </div>

          {/* Customer form */}
          <form onSubmit={handleSubmit} className="card p-6 flex flex-col gap-5">
            <div>
              <label className="block text-white/70 text-sm mb-1.5 font-medium">
                Full Name <span className="text-fire-500">*</span>
              </label>
              <input
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                required
                placeholder="e.g. Kwame Mensah"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-fire-500 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-1.5 font-medium">
                Phone Number <span className="text-fire-500">*</span>
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                type="tel"
                placeholder="e.g. 0501234567"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-fire-500 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-1.5 font-medium">
                Delivery Location <span className="text-fire-500">*</span>
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="e.g. East Legon, Accra"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-fire-500 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-1.5 font-medium">
                Special Instructions
              </label>
              <textarea
                name="instructions"
                value={form.instructions}
                onChange={handleChange}
                rows={3}
                placeholder="Spice level, allergies, special requests..."
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-fire-500 transition-colors text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Placing Order...
                </>
              ) : (
                <><FaFire /> Place Order</>
              )}
            </button>

            <p className="text-white/30 text-xs text-center">
              By placing an order you agree to our 24-hour pre-order policy.
              Delivery anywhere in Accra.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

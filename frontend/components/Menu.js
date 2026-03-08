import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuCategories } from '../lib/menuData';
import { FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';

const formatPrice = (p) => `GH₵${p.toLocaleString()}`;

function MenuCard({ item, onAdd, onRemove, qty }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, borderColor: 'rgba(249,115,22,0.5)' }}
      className="card p-5 flex flex-col gap-3 cursor-default"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-white font-semibold leading-snug">{item.name}</h4>
        <span className="text-fire-400 font-bold whitespace-nowrap text-sm">
          {formatPrice(item.price)}
        </span>
      </div>
      <p className="text-white/50 text-sm leading-relaxed flex-1">{item.description}</p>

      {/* Qty controls */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
        {qty > 0 ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => onRemove(item)}
              className="w-7 h-7 rounded-full border border-fire-500 flex items-center justify-center text-fire-400 hover:bg-fire-500 hover:text-white transition-colors"
            >
              <FaMinus className="text-xs" />
            </button>
            <span className="text-white font-semibold w-4 text-center">{qty}</span>
            <button
              onClick={() => onAdd(item)}
              className="w-7 h-7 rounded-full bg-fire-600 flex items-center justify-center text-white hover:bg-fire-500 transition-colors"
            >
              <FaPlus className="text-xs" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => onAdd(item)}
            className="flex items-center gap-2 text-sm text-fire-400 hover:text-fire-300 transition-colors font-medium"
          >
            <FaPlus className="text-xs" /> Add to order
          </button>
        )}
        {qty > 0 && (
          <span className="text-fire-400 text-sm font-semibold">
            {formatPrice(item.price * qty)}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Menu({ cart, setCart }) {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);

  const addItem = (item) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (item) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (!existing) return prev;
      if (existing.quantity === 1) return prev.filter((c) => c.id !== item.id);
      return prev.map((c) => c.id === item.id ? { ...c, quantity: c.quantity - 1 } : c);
    });
  };

  const activeItems = menuCategories.find((c) => c.id === activeCategory)?.items || [];
  const totalItems = cart.reduce((s, c) => s + c.quantity, 0);

  return (
    <section id="menu" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-subtitle">What We Serve</p>
          <h2 className="section-title">Our Menu</h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Every dish is crafted with fresh Atlantic seafood and our signature spice blends.
            Prices are in Ghana Cedis (GH₵).
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-fire-gradient text-white shadow-lg shadow-fire-900/40'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cart summary bar */}
        {totalItems > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-fire-900/40 border border-fire-500/30 rounded-2xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <FaShoppingCart className="text-fire-400" />
              <span className="text-white font-medium">
                {totalItems} item{totalItems !== 1 ? 's' : ''} in order
              </span>
            </div>
            <span className="text-fire-400 font-bold">
              Total: {formatPrice(cart.reduce((s, c) => s + c.price * c.quantity, 0))}
            </span>
          </motion.div>
        )}

        {/* Items grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {activeItems.map((item) => {
              const cartItem = cart.find((c) => c.id === item.id);
              return (
                <MenuCard
                  key={item.id}
                  item={item}
                  onAdd={addItem}
                  onRemove={removeItem}
                  qty={cartItem?.quantity || 0}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>

        {totalItems > 0 && (
          <div className="text-center mt-10">
            <a href="#order" className="btn-primary">
              Proceed to Order ({totalItems} item{totalItems !== 1 ? 's' : ''})
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

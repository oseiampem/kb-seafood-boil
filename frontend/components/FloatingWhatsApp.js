import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="bg-white text-gray-800 rounded-2xl shadow-2xl p-4 max-w-[220px] text-sm"
          >
            <p className="font-semibold text-gray-900 mb-1">Chat with us! 👋</p>
            <p className="text-gray-500 text-xs">
              Order via WhatsApp or ask us anything about our menu.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href="https://wa.me/233533856150"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 shadow-xl shadow-green-900/40 flex items-center justify-center transition-colors"
      >
        <FaWhatsapp className="text-white text-2xl" />
      </motion.a>

      {/* Pulse ring */}
      <motion.div
        className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-green-400"
        animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
      />
    </div>
  );
}

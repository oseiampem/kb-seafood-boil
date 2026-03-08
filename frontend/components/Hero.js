import { motion } from 'framer-motion';
import { FaFire, FaChevronDown } from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: 'easeOut' } }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1559847844-5315695dadae?w=1920&q=80')",
        }}
      />
      {/* Dark + fire overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-ember" />
      <div className="absolute inset-0 bg-gradient-to-t from-fire-900/30 via-transparent to-transparent" />

      {/* Animated embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-fire-400"
            initial={{ x: `${Math.random() * 100}vw`, y: '110vh', opacity: 0.8 }}
            animate={{ y: '-10vh', opacity: 0 }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <FaFire className="text-fire-500 text-xl animate-flame" />
          <span className="text-fire-400 uppercase tracking-[0.3em] text-sm font-semibold">
            Community 25, Accra
          </span>
          <FaFire className="text-fire-500 text-xl animate-flame" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-none mb-6"
        >
          <span className="block text-white">Spice.</span>
          <span className="block bg-fire-gradient bg-clip-text text-transparent">
            Heat.
          </span>
          <span className="block text-white">Ocean Fire.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Premium seafood trays crafted for heat lovers across Accra.
          Pre-order now — fresh, bold, unforgettable.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#order" className="btn-primary text-base">
            Order Now
          </a>
          <a href="#menu" className="btn-outline text-base">
            View Menu
          </a>
        </motion.div>

        {/* Pre-order notice */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="mt-8 text-fire-400/80 text-sm"
        >
          ⏰ Pre-order only — minimum 24-hour notice required
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
      >
        <FaChevronDown className="text-xl" />
      </motion.div>
    </section>
  );
}

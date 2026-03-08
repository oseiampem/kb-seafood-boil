import { motion } from 'framer-motion';
import { FaUtensils, FaClipboardList, FaCreditCard, FaFire, FaTruck } from 'react-icons/fa';

const steps = [
  { icon: FaUtensils, title: 'Choose Your Tray', desc: 'Browse our menu and select your favourite seafood boil or dish.' },
  { icon: FaClipboardList, title: 'Submit Your Order', desc: 'Fill in your details and special instructions using our order form.' },
  { icon: FaCreditCard, title: 'Confirm Payment', desc: "We'll reach out via WhatsApp to confirm your order and payment details." },
  { icon: FaFire, title: 'We Prepare Fresh', desc: 'Our chefs prepare your order fresh with premium ingredients and bold spices.' },
  { icon: FaTruck, title: 'Delivery Across Accra', desc: 'Your hot, fresh order is delivered right to your door anywhere in Accra.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-subtitle">The Process</p>
          <h2 className="section-title">How It Works</h2>
          <p className="text-white/50 mt-4">
            Ordering is simple. Your feast is just 5 steps away.
          </p>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-[80%] h-0.5 bg-gradient-to-r from-transparent via-fire-700/50 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-center text-center"
              >
                {/* Number + icon bubble */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-fire-gradient flex items-center justify-center shadow-xl shadow-fire-900/50">
                    <step.icon className="text-2xl text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-ember border-2 border-fire-500 flex items-center justify-center">
                    <span className="text-fire-400 text-xs font-bold">{i + 1}</span>
                  </div>
                </div>

                <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-6 bg-fire-900/30 border border-fire-700/30 rounded-2xl max-w-2xl mx-auto"
        >
          <p className="text-fire-400 font-semibold mb-1">⏰ Important Note</p>
          <p className="text-white/70 text-sm">
            All orders require a minimum of <strong className="text-white">24-hour advance notice</strong>.
            Place your order today for tomorrow's feast!
          </p>
        </motion.div>
      </div>
    </section>
  );
}

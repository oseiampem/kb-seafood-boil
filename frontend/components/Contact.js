import { motion } from 'framer-motion';
import { FaPhone, FaWhatsapp, FaSnapchatGhost, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-subtitle">Get In Touch</p>
          <h2 className="section-title">Contact Us</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            {
              icon: FaMapMarkerAlt,
              label: 'Location',
              value: 'Community 25, Accra, Ghana',
              sub: 'Delivery anywhere in Accra',
              color: 'text-fire-400',
            },
            {
              icon: FaClock,
              label: 'Pre-Order Notice',
              value: '24-Hour Advance',
              sub: 'Plan your feast in advance',
              color: 'text-fire-400',
            },
            {
              icon: FaPhone,
              label: 'Phone',
              value: '0533856150',
              href: 'tel:+233533856150',
              color: 'text-fire-400',
            },
            {
              icon: FaSnapchatGhost,
              label: 'Snapchat',
              value: 'yosoy_reina20',
              color: 'text-yellow-400',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card p-6 flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-fire-900/50 flex items-center justify-center shrink-0">
                <item.icon className={`text-xl ${item.color}`} />
              </div>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-white font-semibold hover:text-fire-400 transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-white font-semibold">{item.value}</p>
                )}
                {item.sub && <p className="text-white/40 text-xs mt-0.5">{item.sub}</p>}
              </div>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 card p-8 text-center bg-green-950/30 border-green-800/30"
        >
          <FaWhatsapp className="text-5xl text-green-400 mx-auto mb-4" />
          <h3 className="text-white font-semibold text-xl mb-2">Chat With Us on WhatsApp</h3>
          <p className="text-white/50 text-sm mb-6">
            Fastest way to confirm orders, ask questions, or get updates on your delivery.
          </p>
          <a
            href="https://wa.me/233533856150"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            <FaWhatsapp className="text-lg" /> Message on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}

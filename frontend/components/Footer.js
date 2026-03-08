import { FaFire, FaWhatsapp, FaSnapchatGhost, FaPhone } from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-12 px-4 bg-black/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <FaFire className="text-fire-500 text-xl" />
            <div>
              <p className="font-display font-bold text-white">KB's Seafood Boil</p>
              <p className="text-white/40 text-xs">Community 25, Accra, Ghana</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
            {['#menu', '#how-it-works', '#order', '#contact'].map((href) => (
              <a
                key={href}
                href={href}
                className="hover:text-fire-400 transition-colors capitalize"
              >
                {href.replace('#', '').replace('-', ' ')}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/233533856150"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-green-600/20 border border-green-600/30 flex items-center justify-center text-green-400 hover:bg-green-600 hover:text-white transition-all"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="tel:+233533856150"
              className="w-9 h-9 rounded-full bg-fire-900/40 border border-fire-700/30 flex items-center justify-center text-fire-400 hover:bg-fire-600 hover:text-white transition-all"
              aria-label="Call us"
            >
              <FaPhone className="text-sm" />
            </a>
            <div
              className="w-9 h-9 rounded-full bg-yellow-900/30 border border-yellow-700/30 flex items-center justify-center text-yellow-400"
              title="yosoy_reina20"
            >
              <FaSnapchatGhost />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-white/25 text-xs">
          © {year} KB's Seafood Boil. All rights reserved. Delivery across Accra, Ghana.
        </div>
      </div>
    </footer>
  );
}

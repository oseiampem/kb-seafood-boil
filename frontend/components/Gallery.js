import { motion } from 'framer-motion';
import Image from 'next/image';

const images = [
  { src: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&q=80', alt: 'Seafood boil tray' },
  { src: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80', alt: 'Fresh lobster' },
  { src: 'https://images.unsplash.com/photo-1536183922588-166604504d5e?w=600&q=80', alt: 'Shrimp platter' },
  { src: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&q=80', alt: 'Crab legs' },
  { src: 'https://images.unsplash.com/photo-1550101479-a68c5d8cfabe?w=600&q=80', alt: 'Seafood pasta' },
  { src: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&q=80', alt: 'Prawn dish' },
];

export default function Gallery() {
  return (
    <section className="py-24 px-4 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-subtitle">Fresh Every Day</p>
          <h2 className="section-title">From Our Kitchen</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              className={`relative overflow-hidden rounded-2xl ${
                i === 0 || i === 5 ? 'aspect-square md:col-span-1 row-span-1' : 'aspect-square'
              } ${i === 0 ? 'md:col-span-2 md:row-span-2 aspect-auto' : ''}`}
              style={{ aspectRatio: i === 0 ? '2/1' : '1/1' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

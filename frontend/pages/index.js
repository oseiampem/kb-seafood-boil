import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Menu from '../components/Menu';
import Gallery from '../components/Gallery';
import HowItWorks from '../components/HowItWorks';
import OrderForm from '../components/OrderForm';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export default function Home() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <Head>
        <title>KB's Seafood Boil — Spice. Heat. Ocean Fire. | Accra, Ghana</title>
        <meta
          name="description"
          content="Premium seafood boils and trays delivered across Accra, Ghana. Pre-order your spicy seafood feast today. Community 25, Accra."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="KB's Seafood Boil — Spice. Heat. Ocean Fire." />
        <meta
          property="og:description"
          content="Premium seafood trays crafted for heat lovers across Accra."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Navbar />
      <main>
        <Hero />
        <Menu cart={cart} setCart={setCart} />
        <Gallery />
        <HowItWorks />
        <OrderForm cart={cart} setCart={setCart} />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

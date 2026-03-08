import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a0a00',
            color: '#fff',
            border: '1px solid rgba(249,115,22,0.3)',
            borderRadius: '12px',
          },
          success: { iconTheme: { primary: '#f97316', secondary: '#fff' } },
          error: { iconTheme: { primary: '#e11d48', secondary: '#fff' } },
        }}
      />
    </>
  );
}

'use client';

import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Link from 'next/link';
import anim from '../styles/animations.module.css';

export default function Pages() {
  const pagesList = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Shop', href: '/shop' },
    { name: 'Cart', href: '/cart' },
    { name: 'Articles', href: '/articles' },
    { name: 'Contact', href: '/contact' },
    { name: 'Login', href: '/auth/login' },
    { name: 'Signup', href: '/auth/signup' },
  ];

  return (
    <div className="root">
      <Header />
      <NavBar />
      <main className={anim.fadeIn}>
        <section style={{ padding: '4rem 10%', width: '100%', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '3rem', textAlign: 'center', fontFamily: 'var(--titles-font)' }}>
            Site Map
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {pagesList.map((page) => (
              <Link key={page.href} href={page.href} style={{
                padding: '1.5rem 2.5rem',
                border: '1px solid #f0f0f0',
                borderRadius: '16px',
                textDecoration: 'none',
                color: 'var(--black)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)';
                  e.currentTarget.style.transform = 'translateX(10px)';
                  e.currentTarget.style.borderColor = 'var(--black)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.borderColor = '#f0f0f0';
                }}
              >
                <h3 style={{ textTransform: 'capitalize', fontSize: '1.5rem', fontWeight: '500' }}>{page.name}</h3>
                <span style={{ fontSize: '1.2rem', color: '#888' }}>→</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

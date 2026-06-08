'use client';

import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import anim from '../styles/animations.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="root">
        <Header />
        <NavBar />
        <main className={anim.fadeIn}>
          <section style={{ padding: '4rem 10%', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🛒</div>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontFamily: 'var(--titles-font)' }}>Your Cart is Empty</h1>
            <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2.5rem', maxWidth: '500px' }}>
              It looks like you haven't added any books to your cart yet. 
              Start exploring our collection to find your next great read!
            </p>
            <Link href="/shop" style={{ 
              padding: '1rem 2.5rem', 
              backgroundColor: 'var(--black)', 
              color: 'var(--white)', 
              textDecoration: 'none', 
              borderRadius: '8px',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease'
            }}
            className={anim.btnRaise}
            >
              Go to Shop
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="root">
      <Header />
      <NavBar />
      <main className={anim.fadeIn} style={{ padding: '4rem 10%' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '3rem', fontFamily: 'var(--titles-font)' }}>Shopping Cart</h1>
        
        <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '2', minWidth: '400px' }}>
            {cart.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '2rem', padding: '1.5rem 0', borderBottom: '1px solid #eee', alignItems: 'center' }}>
                <div style={{ width: '80px', height: '110px', backgroundColor: '#f5f5f5', borderRadius: '4px', overflow: 'hidden' }}>
                  <Image src={item.image} alt={item.name} width={80} height={110} unoptimized style={{ objectFit: 'contain' }} />
                </div>
                <div style={{ flex: '1' }}>
                  <h3 style={{ fontSize: '1.4rem' }}>{item.name}</h3>
                  <p style={{ color: '#666' }}>{item.author}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '5px 10px', borderRadius: '4px', border: '1px solid #ddd' }}>-</button>
                  <span style={{ fontSize: '1.2rem' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '5px 10px', borderRadius: '4px', border: '1px solid #ddd' }}>+</button>
                </div>
                <div style={{ width: '100px', textAlign: 'right', fontSize: '1.3rem', fontWeight: 'bold' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button onClick={() => removeFromCart(item.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
              </div>
            ))}
          </div>
          
          <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '12px', height: 'max-content' }}>
            <h2 style={{ marginBottom: '2rem' }}>Order Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.2rem' }}>
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.2rem' }}>
              <span>Shipping</span>
              <span style={{ color: 'green' }}>Free</span>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #ddd', marginBottom: '2rem' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <Link href="/checkout" style={{ 
              display: 'block',
              textAlign: 'center',
              padding: '1.2rem', 
              backgroundColor: 'var(--black)', 
              color: 'var(--white)', 
              textDecoration: 'none', 
              borderRadius: '8px', 
              fontSize: '1.2rem'
            }}
            className={anim.btnRaise}
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

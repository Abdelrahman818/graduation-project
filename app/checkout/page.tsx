'use client';

import { useState } from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import anim from '../styles/animations.module.css';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="root">
        <Header />
        <NavBar />
        <main className={anim.fadeIn} style={{ padding: '4rem 10%', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontSize: '5rem', color: 'green', marginBottom: '1rem' }}>✓</div>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontFamily: 'var(--titles-font)' }}>Order Successful!</h1>
          <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2.5rem' }}>
            Thank you for your purchase. Your books are on their way to your personal bookshelf.
          </p>
          <button onClick={() => router.push('/')} style={{ padding: '1rem 2.5rem', backgroundColor: 'var(--black)', color: 'var(--white)', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Return Home
          </button>
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
        <h1 style={{ fontSize: '3rem', marginBottom: '3rem', fontFamily: 'var(--titles-font)' }}>Checkout</h1>
        
        <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '2', minWidth: '400px' }}>
            <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <section>
                <h2 style={{ marginBottom: '1.5rem' }}>Shipping Information</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input type="text" placeholder="First Name" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                  <input type="text" placeholder="Last Name" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                  <input type="email" placeholder="Email Address" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', gridColumn: 'span 2' }} />
                  <input type="text" placeholder="Street Address" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', gridColumn: 'span 2' }} />
                  <input type="text" placeholder="City" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                  <input type="text" placeholder="ZIP / Postal Code" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                </div>
              </section>

              <section>
                <h2 style={{ marginBottom: '1.5rem' }}>Payment Method</h2>
                <div style={{ padding: '1.5rem', border: '1px solid var(--black)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input type="radio" checked readOnly />
                  <span>Credit / Debit Card</span>
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input type="text" placeholder="Card Number" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input type="text" placeholder="MM / YY" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                    <input type="text" placeholder="CVC" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                  </div>
                </div>
              </section>

              <button 
                type="submit" 
                disabled={isProcessing || cart.length === 0}
                style={{ 
                  padding: '1.5rem', 
                  backgroundColor: 'var(--black)', 
                  color: 'var(--white)', 
                  border: 'none', 
                  borderRadius: '8px', 
                  fontSize: '1.3rem', 
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  opacity: isProcessing ? 0.7 : 1
                }}
              >
                {isProcessing ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
              </button>
            </form>
          </div>

          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{ backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '12px' }}>
              <h2 style={{ marginBottom: '1.5rem' }}>Your Order</h2>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '1.5rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 'bold' }}>
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

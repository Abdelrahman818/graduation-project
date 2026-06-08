'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import anim from '../../styles/animations.module.css';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="root">
        <Header />
        <NavBar />
        <main style={{ padding: '4rem 10%', textAlign: 'center' }}>
          <h1>Product Not Found</h1>
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
        <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#f9f9f9', borderRadius: '12px', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
             <Image 
               src={product.image} 
               alt={product.name} 
               width={400} 
               height={500} 
               unoptimized
               style={{ objectFit: 'contain' }}
             />
          </div>
          
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', fontFamily: 'var(--titles-font)' }}>{product.name}</h1>
            <h2 style={{ fontSize: '1.5rem', color: '#666', marginBottom: '2rem' }}>by {product.author}</h2>
            
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem', color: '#444' }}>
              Experience the depth of {product.author}'s storytelling in this masterpiece. 
              Perfect for your personal library or as a thoughtful gift for a fellow book lover.
            </p>
            
            <div style={{ fontSize: '2.5rem', color: 'var(--beige)', fontWeight: 'bold', marginBottom: '2rem' }}>
              ${product.price.toFixed(2)}
            </div>
            
            <button 
              onClick={() => addToCart(product)}
              style={{ 
                padding: '1.2rem 3rem', 
                backgroundColor: 'var(--black)', 
                color: 'var(--white)', 
                border: 'none', 
                borderRadius: '8px', 
                fontSize: '1.2rem', 
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              className={anim.btnRaise}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

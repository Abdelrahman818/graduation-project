import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import anim from '../styles/animations.module.css';

export default function Contact() {
  return (
    <div className="root">
      <Header />
      <NavBar />
      <main className={anim.fadeIn}>
        <section style={{ padding: '4rem 10%', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Contact Us</h1>
          <p style={{ marginBottom: '3rem' }}>Have any questions? We'd love to hear from you.</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'left', minWidth: '250px' }}>
              <h3>Email</h3>
              <p>support@readora.com</p>
              
              <h3 style={{ marginTop: '2rem' }}>Phone</h3>
              <p>+1 (555) 123-4567</p>
              
              <h3 style={{ marginTop: '2rem' }}>Address</h3>
              <p>123 Book Lane, Library City, BK 45678</p>
            </div>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '350px' }}>
              <input type="text" placeholder="Your Name" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
              <input type="email" placeholder="Your Email" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
              <textarea placeholder="Your Message" rows={5} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}></textarea>
              <button style={{ padding: '12px', backgroundColor: 'var(--black)', color: 'var(--white)', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Send Message</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import anim from '../styles/animations.module.css';

export default function About() {
  return (
    <div className="root">
      <Header />
      <NavBar />
      <main className={anim.fadeIn}>
        <section style={{ padding: '4rem 10%', textAlign: 'center' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '2rem' }}>About Readora</h1>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
            Readora is your ultimate destination for discovering, renting, and purchasing books. 
            We believe that every book has a story to tell and every reader deserves a personal bookshelf 
            that reflects their journey. Our mission is to make literature accessible and enjoyable for everyone.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

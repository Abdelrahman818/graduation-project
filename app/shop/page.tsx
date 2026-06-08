import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import PopularBooks from '../PopularBooks';
import anim from '../styles/animations.module.css';

export default function Shop() {
  return (
    <div className="root">
      <Header />
      <NavBar />
      <main className={anim.fadeIn}>
        <section style={{ padding: '4rem 10%' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>Our Book Shop</h1>
          <PopularBooks />
        </section>
      </main>
      <Footer />
    </div>
  );
}

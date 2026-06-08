import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import LatestArticles from '../LatestArticles';
import anim from '../styles/animations.module.css';

export default function Articles() {
  return (
    <div className="root">
      <Header />
      <NavBar />
      <main className={anim.fadeIn}>
        <section style={{ padding: '4rem 10%' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>Latest Articles & News</h1>
          <LatestArticles />
        </section>
      </main>
      <Footer />
    </div>
  );
}

import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Content from './Content';

export default async function Home() {
  return (
    <div className="root">
      <Header />
      <NavBar />
      <Content />
      <Footer />
    </div>
  );
}

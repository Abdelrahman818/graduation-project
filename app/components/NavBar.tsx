import Link from 'next/link';
import styles from '@/app/styles/nav-bar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.mainNav}>
      <div className={styles.logo}></div>
      <ul className={styles.navagation}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/pages">pages</Link></li>
        <li><Link href="/shop">shop</Link></li>
        <li><Link href="/articles">articles</Link></li>
        <li><Link href="/contact">contact</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;

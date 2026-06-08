 'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import API from '../API';
import { ThemeToggle } from './ThemeToggle';

import styles from '@/app/styles/header.module.css';
import anim from '@/app/styles/animations.module.css';

import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

interface HeaderData {
  name: string,
  isAdmin: boolean,
  email: string,
}

const Header = () => {

  const router = useRouter();

  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);

  const [showAccountOpts, setShowAccountOpts] = useState<Boolean>(false);

  const [headerData, setHeaderData] = useState<HeaderData>({
    name: '',
    isAdmin: false,
    email: '',
  });

  const showCart = () => {
    router.push('/cart');
  };

  const showProfile = () => {
    if (!isLoggedin)
      router.push('/auth/login');
    else
      setShowAccountOpts(prev => !prev);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('session_token');
      setIsLoggedin(false);
      setHeaderData({
        name: '',
        isAdmin: false,
        email: '',
      });
      router.replace('/');
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedin(true);
        setHeaderData({
          name: user.displayName || user.email?.split('@')[0] || 'User',
          isAdmin: false, // You can implement admin logic later
          email: user.email || '',
        });
        // Optionally store the token for other API calls
        user.getIdToken().then(token => localStorage.setItem('session_token', token));
      } else {
        setIsLoggedin(false);
        setHeaderData({
          name: '',
          isAdmin: false,
          email: '',
        });
        localStorage.removeItem('session_token');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className={`${styles.mainHeader} ${anim.fadeInDown}`}>

      <div className={styles.socialIcons}>

        <div className={styles.facebookIcon}>
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640">
              <path d="M240 363.3L240 576L356 576L356 363.3L442.5 363.3L460.5 265.5L356 265.5L356 230.9C356 179.2 376.3 159.4 428.7 159.4C445 159.4 458.1 159.8 465.7 160.6L465.7 71.9C451.4 68 416.4 64 396.2 64C289.3 64 240 114.5 240 223.4L240 265.5L174 265.5L174 363.3L240 363.3z"/></svg>
        </div>

        <div className={styles.instagramIcon}>
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640">
              <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z"/></svg>
        </div>

        <div className={styles.linkedinIcon}>
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640">
              <path d="M196.3 512L103.4 512L103.4 212.9L196.3 212.9L196.3 512zM149.8 172.1C120.1 172.1 96 147.5 96 117.8C96 103.5 101.7 89.9 111.8 79.8C121.9 69.7 135.6 64 149.8 64C164 64 177.7 69.7 187.8 79.8C197.9 89.9 203.6 103.6 203.6 117.8C203.6 147.5 179.5 172.1 149.8 172.1zM543.9 512L451.2 512L451.2 366.4C451.2 331.7 450.5 287.2 402.9 287.2C354.6 287.2 347.2 324.9 347.2 363.9L347.2 512L254.4 512L254.4 212.9L343.5 212.9L343.5 253.7L344.8 253.7C357.2 230.2 387.5 205.4 432.7 205.4C526.7 205.4 544 267.3 544 347.7L544 512L543.9 512z"/></svg>
        </div>

        <div className={styles.twitterIcon}>
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640">
              <path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"/></svg>
        </div>

      </div>

      <div className={styles.accountOptions}>

        <div className={styles.optionContainer}>
          <ThemeToggle />
        </div>

        <div
          onClick={showProfile}
          className={styles.optionContainer}
          >
          
          <div className={styles.accountIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640">
                  <path d="M240 192C240 147.8 275.8 112 320 112C364.2 112 400 147.8 400 192C400 236.2 364.2 272 320 272C275.8 272 240 236.2 240 192zM448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320C390.7 320 448 262.7 448 192zM144 544C144 473.3 201.3 416 272 416L368 416C438.7 416 496 473.3 496 544L496 552C496 565.3 506.7 576 520 576C533.3 576 544 565.3 544 552L544 544C544 446.8 465.2 368 368 368L272 368C174.8 368 96 446.8 96 544L96 552C96 565.3 106.7 576 120 576C133.3 576 144 565.3 144 552L144 544z"/></svg>
          </div>
          <span>{ headerData.name || 'account' }</span>

          {showAccountOpts && (
            <div className={styles.accountOption}>
              <span onClick={logout} className='danger'>logout</span>
            </div>
          )}

        </div>

        <div
          onClick={showCart}
          className={styles.optionContainer}
          >
          
          <div
            className={styles.cartIcon}>
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640">
                <path d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z"/></svg>
          </div>
          <span>cart</span>

        </div>

        <div className={styles.optionContainer}>
          
          <div className={styles.searchIcon}>
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640">
                <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/></svg>
          </div>
          <span>search</span>
        
        </div>

      </div>

    </header>
  );
}

export default Header;

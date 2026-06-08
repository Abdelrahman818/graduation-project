'use client';

import { useState, useEffect } from "react";
import API from '../API';
import { useRouter } from "next/navigation";
import style from "@/app/styles/auth.module.css";
import { auth, googleProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";

interface FormData {
  email: string,
  password: string,
};

const LoginForm = () => {

  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Store token and redirect
      localStorage.setItem('session_token', await user.getIdToken());
      router.replace('/');
    } catch (err: any) {
      setError(err.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(API + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (json.successful) {
        localStorage.setItem('session_token', json.token);
        router.replace('/');
      } else {
        setError(json.error || json.msg || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('A network error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          id="email"
          className={style.inputField}
          value={formData.email}
          onChange={handleForm}
          required
          />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          id="pwd"
          className={style.inputField}
          value={formData.password}
          onChange={handleForm}
          required
        />
        <button className={style.loginBtn} disabled={loading}>
          {loading ? 'Logging in...' : 'login'}
        </button>
        {error && <div className={style.errorBox}>{error}</div>}
      </form>

      <div className={style.divider}>OR</div>

      <button className={style.googleBtn} onClick={handleGoogleLogin} type="button" disabled={loading}>
        <div className={style.googleIcon}></div>
        Continue with Google
      </button>
    </>
  );
};

export default LoginForm;

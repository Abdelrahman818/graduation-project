'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import API from '../API';
import style from "@/app/styles/auth.module.css";
import { auth, googleProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
}

const SignupForm = () => {

  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  });

  const [passwordConfErr, setPasswordConfErr] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();

    if (formData.name.length < 3) {
      setError('Name must be at least 3 characters long.');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.password !== formData.passwordConf) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { passwordConf, ...payload } = formData;
      
      const res = await fetch(API + '/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const json = await res.json();
      
      if (json.successful && json.msg === 'redirect') {
        router.replace('/verifing');
      } else {
        setError(json.error || json.msg || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('A network error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formData.passwordConf === '' || formData.password === '') {
      setPasswordConfErr(false);
    } else {
      setPasswordConfErr(formData.password !== formData.passwordConf);
    }
  }, [formData.password, formData.passwordConf]);

  return (
    <>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          id="name"
          className={style.inputField}
          onChange={handleForm}
          value={formData.name}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          id="email"
          className={style.inputField}
          onChange={handleForm}
          value={formData.email}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          id="pwd"
          className={style.inputField}
          onChange={handleForm}
          value={formData.password}
          required
        />

        <input
          type="password"
          name="passwordConf"
          placeholder="Confirm your password"
          id="pwdConf"
          className={style.inputField}
          style={passwordConfErr ? { borderBottom: '2px solid red' } : {}}
          onChange={handleForm}
          value={formData.passwordConf}
          required
        />

        <button className={style.signupBtn} disabled={loading}>
          {loading ? 'Creating Account...' : 'signup'}
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

export default SignupForm;

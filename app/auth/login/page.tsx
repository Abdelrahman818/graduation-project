import LoginForm from '@/app/components/LoginForm';
import Link from 'next/link';
import style from '@/app/styles/auth.module.css';

const Login = () => {
  return (
    <div className={style.login}>

      <div className={style.leftSide}>
        <div className={style.logo}></div>

        <div className={style.title}>
          <h2>welcome back to readora</h2>
        </div>
        <p className={style.loginText}>login to explore your personal bookshelf.</p>

        <div className={style.formCont}>

          <LoginForm />

          <div className={style.otherOptions}>
            <span>forgot password?</span>
          </div>

          <div className={style.otherOptions}>
            <Link href='/auth/signup'>create new account.</Link>
          </div>

        </div>

      </div>

      <div className={style.rightSide}></div>

    </div>
  )
}

export default Login;

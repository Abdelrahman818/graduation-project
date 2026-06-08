import SignupForm from "@/app/components/signupForm";
import Link from "next/link";
import style from "../../styles/auth.module.css";

const Signup = () => {

  const goToSignup = () => {
    return <Link href='/auth/signup'>already have an account?</Link>
  };

  return (
    <div className={style.signup}>
      <div className={style.leftSide}>
        <div className={style.logo}></div>

        <div className={style.title}>
          <h2>welcome to readora</h2>
        </div>

        <p className={style.loginText}>
          signup to explore your personal bookshelf.
        </p>

        <div className={style.formCont}>
          
          <SignupForm />

          <div className={style.otherOptions}>
            { goToSignup() }
          </div>
        </div>
      </div>

      <div className={style.rightSide}></div>
    </div>
  );
};

export default Signup;

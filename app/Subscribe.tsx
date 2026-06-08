import style from './styles/subscribe.module.css';

const Subscribe = () => {
  return (
    <section className={style.subscribeSection}>
      <div className={style.bg}></div>
      <div className={style.title}>
        <h2>subscribe to our newsletter</h2>
        <div className={style.underline}></div>
      </div>
      <div className={style.subscribe}>
        <p className={style.subscribtion}>
          Lorem ipsum dolor sit, amet
          consectetur adipisicing elit.
          Rerum, omnis! Id, ut asperiores
          ipsam nemo sunt suscipit iusto
          quis tenetur amet nostrum rem
          assumenda! Eos suscipit
          laudantium sint aut corporis.
        </p>
        <div className='email-sender'>
          <input type="text" placeholder='Enter Your Email Address Here' className={style.inputMsg} />
          <button className={style.sendBtn}>send</button>
        </div>
      </div>
    </section>
  )
}

export default Subscribe;

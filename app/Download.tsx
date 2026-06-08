import style from './styles/download.module.css';

const Download = () => {
  return (
    <section className={style.downloadSection}>
      <div className={style.bg}></div>
      <div className={style.phone}></div>
      <div className={style.info}>
        <div className={style.title}>
          <h2>download the app now!</h2>
          <div className={style.underline}></div>
        </div>
        <p className={style.disc}>
          Lorem ipsum dolor sit, amet
          consectetur adipisicing elit.
          Culpa expedita officia,
          repellat laborum natus
          praesentium placeat. Veniam
          amet, maxime eum nesciunt
          incidunt quos consequatur
          doloribus, modi dolore
          itaque reprehenderit cumque?
        </p>
        <div className="flex items-center gap-2.5 mt-10">
          <div className={style.play}></div>
          <div className={style.store}></div>
        </div>
      </div>
    </section>
  )
}

export default Download;

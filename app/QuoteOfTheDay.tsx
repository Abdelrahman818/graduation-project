import styles from './styles/day-qoute.module.css';

const QuoteOfTheDay = () => {
  return (
    <section>
      <div className={styles.title}>
        <h2>quote of the day</h2>
        <div className={styles.underline}></div>
      </div>
      <div className={styles.quote}>
        <p>
          Lorem ipsum dolor sit amet
          consectetur adipisicing elit.
          Soluta sit reprehenderit
          consequatur mollitia impedit
          praesentium optio dicta sapiente
          illum qui cumque in, perferendis
          maiores pariatur provident quo
          expedita reiciendis eum!
        </p>
        <div className={styles.author}>
          <span>author</span>
        </div>
      </div>
    </section>
  )
}

export default QuoteOfTheDay;

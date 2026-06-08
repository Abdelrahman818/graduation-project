import style from './styles/featured.module.css';
import Image from 'next/image';

const Featured = () => {
  return (
    <section>
      <div className={style.caption}>some quality items</div>

      <div className='relative mt-1'>
        <div className={style.leftLine}></div>
        <h2 className={style.title}>featured books</h2>
        <div className={style.rightLine}></div>
      </div>

      <div className={style.books}>

        <div className="book-card">
          <div className={style.bookCard}>
            <Image
              src={require("@/assets/books/book1.png")}
              alt='book cover'
              />
          </div>
          <div className={style.bookDisc}>
            <div className={style.bookName}>
              <span>simple way of piece life</span>
            </div>
            <div className={style.author}>
              <span>armor ramsy</span>
            </div>
            <div className={style.price}>
              <span>$ 40.00</span>
            </div>
          </div>
        </div>

      </div>

      <div className={style.selections}>
        <div className={style.circle}></div>
      </div>

    </section>
  )
}

export default Featured;

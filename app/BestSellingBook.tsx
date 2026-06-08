import '@/assets/backgrounds/bestSelling.png';
import Image from 'next/image';
import style from './styles/best-selling.module.css';

const BestSellingBook = () => {
  return (
    <section className={style.bestSelling}>
      <div className={style.bgImg}></div>
      <div>
        <Image
          src={require('@/assets/books/book.png')}
          alt='image not found'
          />
      </div>

      <div className={style.bookInfo}>
        <h2 className={style.title}>best selling book</h2>
        <div className={style.underline}></div>

        <div className={style.author}>
          <span>author name</span>
        </div>

        <div className={style.bookName}>
          <span>book name</span>
        </div>

        <div className={style.bookDisc}>
          <p className='ml-2'>
            Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
            Dolor fuga sit fugiat exercitationem,
            autem facere perferendis
            voluptates nisi animi, temporibus
            quas dignissimos corporis iste.
            Quae nam eligendi adipisci
            velit possimus?
          </p>
        </div>

        <div className={style.price}>
          <span>$45.00</span>
        </div>

        <button className={style.buyBtn}>shop it now</button>

      </div>

    </section>
  )
}

export default BestSellingBook;

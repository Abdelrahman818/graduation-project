import Image from "next/image";
import style from "./styles/offers.module.css";

const Offers = () => {
  return (
    <section className="relative">
      <div className={style.bg}></div>
      <div className={style.caption}>
        <span>grap your opportunity</span>
      </div>
      <div className={style.title}>
        <h2>books with offer</h2>
      </div>
      <div className={style.books}>

        <div className={style.book}>
          
          <div className={style.bookCover}>
            <Image
              src={require('@/assets/books/book1.png')}
              alt="image not found"
              />
          </div>

          <div className={style.bookName}>
            <span>way of happiness</span>
          </div>

          <div className={style.author}>
            <span>author</span>
          </div>

          <div className={style.price}>
            <div className={style.original}>
              <span>$50.00</span>
            </div>
            <div className={style.currPrice}>
              <span>$40.00</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Offers;

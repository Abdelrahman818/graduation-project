import Image from "next/image";
import style from "@/app/styles/most-sold.module.css";

const MostSold = () => {
  return (
    <section className={style.featuredBooks}>
      <div className={style.infos}>
        <h1 className={style.title}>life of the wild</h1>
        <p className={style.disc}>
          Lorem ipsum dolor sit amet
          consectetur adipisicing elit.
          Natus unde omnis minus libero
          fuga est ullam, laborum quod
          saepe, magnam itaque ex dolorem
          facilis dolore consectetur
          eligendi, reprehenderit
          repellat fugit?
        </p>
        <button className={style.readMore}>Read more</button>
        <div className={style.selectors}>
          <div className={style.circle}></div>
          <div className={style.circle}></div>
          <div className={style.circle}></div>
        </div>
      </div>
      <div className={style.book}>
        <div className={style.spot}></div>
        <div className="book-img">
        <Image 
          src={require('@/assets/books/book.png')} 
          alt="Book cover" 
          />
        </div>
      </div>
    </section>
  )
}

export default MostSold;

import style from './styles/latest-articles.module.css';
import Image from 'next/image';

const LatestArticles = () => {
  return (
    <section className={style.articlesSection}>
      <div className={style.caption}>
        <span>read our articles</span>
      </div>
      <div className={style.title}>
        <h2>latest articles</h2>
      </div>
      <div className={style.articles}>
        
        <div className={style.article}>
          <div className={style.articleCover}>
            <Image
              src={require('@/assets/articles/Rectangle 38.png')}
              alt='image not found'
              />
          </div>
          <div className={style.date}>
            <span>21 May 2025</span>
          </div>
          <div className={style.articleName}>
            <span>this is the article name</span>
          </div>
          <div className={style.separator}></div>
          <div className={style.articleCategory}>
            <span>inspiration</span>
          </div>
        </div>

      </div>
      <button className={style.allArticles}>read all articles</button>
    </section>
  )
}

export default LatestArticles;

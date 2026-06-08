'use client';

import Image from "next/image";
import Link from "next/link";
import style from "./styles/popular-books.module.css";
import { products } from "./data/products";
import { useCart } from "./context/CartContext";

const PopularBooks = () => {
  const { addToCart } = useCart();

  return (
    <section>
      <div className={style.caption}>some quality items</div>
      <div className={style.title}>
        <div className={style.leftLine}></div>
        <h2 className="w-max m-auto">popular books</h2>
        <div className={style.rightLine}></div>
      </div>
      <ul className={style.filters}>
        <li>all genre</li>
        <li>buisness</li>
        <li>technology</li>
        <li>adventure</li>
        <li>romantic</li>
        <li>fictional</li>
      </ul>
      <div className={style.books}>
        {products.map((product) => (
          <div key={product.id} className={style.book}>
            <Link href={`/shop/${product.id}`} className={style.bookLink}>
              <div className={style.bookCover}>
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  width={250} 
                  height={350} 
                  unoptimized
                  style={{ objectFit: 'contain', borderRadius: '8px' }}
                />
              </div>
              <div className={style.bookName}>
                <h3>{product.name}</h3>
              </div>
              <div className={style.author}>
                <span>{product.author}</span>
              </div>
              <div className={style.price}>
                <span>${product.price.toFixed(2)}</span>
              </div>
            </Link>
            <button 
              className={style.addToCartBtn}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PopularBooks;

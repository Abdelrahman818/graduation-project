import MostSold from './MostSold';
import Featured from './Featured';
import BestSellingBook from './BestSellingBook';
import PopularBooks from './PopularBooks';
import QuoteOfTheDay from './QuoteOfTheDay';
import Offers from './Offers';
import Subscribe from './Subscribe';
import LatestArticles from './LatestArticles';
import Download from './Download';

import anim from './styles/animations.module.css';

const Content = () => {
  return (
    <main className={anim.fadeIn}>
      <MostSold />
      <Featured />
      <BestSellingBook />
      <PopularBooks />
      <QuoteOfTheDay />
      <Offers />
      <Subscribe />
      <LatestArticles />
      <Download />
    </main>
  )
}

export default Content;

import { resolve } from 'path';
import { categories } from '../../constants';
import fetchNews from '../../lib/fetchNews';
import NewsList from './NewsList';
import response from './response.json';

async function Homepage() {
  // fetch newsdata
  const news: NewsResponse = /* response || */ await fetchNews(categories.join(','));
  //console.log(news);

  //await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div>
      <NewsList news={news} />
    </div>
  );
}
export default Homepage;

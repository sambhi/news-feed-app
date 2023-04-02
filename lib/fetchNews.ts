import { gql } from 'graphql-request';
import sortNewsByImage from './sortNewsByImage';
const fetchNews = async (category?: Category | string, keywords?: string, isDynamic?: boolean) => {
  const query = gql`
    query MyQuery($access_key: String!, $categories: String!, $keywords: String) {
      myQuery(
        access_key: $access_key
        categories: $categories
        countries: "gb"
        sort: "published_desc"
        keywords: $keywords
      ) {
        data {
          country
          description
          image
          language
          published_at
          source
          title
          url
          category
          author
        }
        pagination {
          count
          limit
          offset
          total
        }
      }
    }
  `;
  // fetch function with Next JS 13 caching
  const res = await fetch('https://devonport.stepzen.net/api/excited-angelfish/__graphql', {
    method: 'POST',
    cache: isDynamic ? 'no-cache' : 'default',
    next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `ApiKey ${process.env.STEPZEN_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        access_key: process.env.MEDIASTACK_API_KEY,
        categories: category,
        keywords: keywords,
      },
    }),
  });
  console.log('LOADING NEW DATA FROM API for catergory >>>>', category, keywords);

  const newsResponse = await res.json();
  // sort function by images vs not images present
  const news = sortNewsByImage(newsResponse.data.myQuery);
  return news;
  // return res
};

export default fetchNews;

// Example import
// stepzen import curl "http://api.mediastack.com/v1/news?access_key=d03808babc970372481f0f9fd92db5bb&countries=us%2Cgb&limit=100&offset=0&sort=published_desc"

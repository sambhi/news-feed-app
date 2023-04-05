import NewsList from '../../NewsList';
import { categories } from '@/constants';
import fetchNews from '@/lib/fetchNews';
import React from 'react';

type Props = {
  params: { category: Category };
};

async function NewsCategory({ params }: Props) {
  const news: NewsResponse = await fetchNews(params.category);

  return (
    <div>
      <h1 className="pt-8 mx-auto pl-10 text-4xl font-serif font-bold capitalize underline underline-offset-2 decoration-orange-500 ">
        {params.category}
      </h1>
      <NewsList news={news} />
    </div>
  );
}

export default NewsCategory;

export async function generateStaticParams() {
  return categories.map((category) => ({ category: category }));
}

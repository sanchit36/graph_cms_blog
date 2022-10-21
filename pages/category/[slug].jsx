import React from 'react';
import { useRouter } from 'next/router';

import { getCategories, getCategoryPost, getCategory } from '../../services';
import { PostCard, Categories, Loader } from '../../components';
import Head from 'next/head';

const CategoryPost = ({ posts, category }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Category | {category.name}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='container mx-auto px-10 mb-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          <div className='col-span-1 lg:col-span-8'>
            {posts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
          </div>
          <div className='col-span-1 lg:col-span-4'>
            <div className='relative lg:sticky top-8'>
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CategoryPost;

export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);
  const category = await getCategory(params.slug);
  return {
    props: { posts, category },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}

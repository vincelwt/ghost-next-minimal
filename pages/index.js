import Head from "next/head"
import { getPosts } from "../lib/posts"
import Link from "next/link"
import { NextSeo } from 'next-seo'

import moment from "moment"

export const getStaticProps = async () => {
  const posts = await getPosts()

  if (!posts) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      posts,
      years: [... new Set(posts.map(p => moment(p.published_at).format('YYYY')))]
    }
  }
}


export default function Home({ posts, years }) {

  return (
    <>
      <NextSeo
        title="All Posts"
      />

      <main className="home-list">
        <h3 className="mb-4 italic font-normal">{ process.env.NEXT_PUBLIC_BLOG_TITLE }</h3>
        <h1 className="text-2xl my-8 font-bold">Posts</h1>

        {
          years.map(y => 
            <>
              <p className='mb-2 font-bold text-lg'>{y}</p>
              <ul>
                {posts.filter(p => moment(p.published_at).format('YYYY') === y).map((post) => 
                  <li className="mt-3 text-lg" key={post.slug}>
                    <span className='mr-3'>{moment(post.published_at).format("DD MMM")}</span>
                    
                    <Link href='/posts/[slug]' as={`/posts/${post.slug}`}>
                      <a className="font-semibold">{post.title}</a>
                    </Link>
                  </li>
                )}
              </ul>
            </>
          )
        }

      </main>

    </>
  )
}

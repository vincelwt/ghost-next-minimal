import Head from "next/head"
import { getPosts } from "../lib/posts"
import Link from "next/link"
import { DefaultSeo } from 'next-seo'

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
      posts
    }
  }
}


export default function Home({ posts }) {

  return (
    <>
      <DefaultSeo
        titleTemplate = '%s | Maelstrom'
        openGraph={{
          type: 'website',
          locale: 'en_EN',
          url: 'https://blog.lyser.io',
          site_name: 'Maelstrom',
        }}
        twitter={{
          handle: '@vincelwt',
          // cardType: 'summary_large_image',
        }}
      />

      <main className="">
        <h1 className="text-2xl my-8 font-bold">Posts</h1>

        <ul>
          {posts.map((post) => 
            <li className="mt-3 text-lg" key={post.slug}>
              <span className='mr-3 font-semibold'>{moment(post.published_at).format("MM/YYYY")}</span>
              
              <Link href='/posts/[slug]' as={`/posts/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          )}
        </ul>
      </main>

    </>
  )
}

// pages/posts/[slug].js

import Link from "next/link"
import { NextSeo } from 'next-seo';

import { getSinglePost, getPosts } from "../../lib/posts"

export async function getStaticPaths() {
  const posts = await getPosts()

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  const post = await getSinglePost(context.params.slug)
  console.log(post)
  if (!post) return { notFound: true }

  return {
    props: { post }
  }
}

const PostPage = ({ post }) => {

  return (
    <>
      <NextSeo
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt}
      />
      <Link href="/" className="text-blue-600">← All posts</Link>
      <article className="article">
        <h1>{post.title}</h1>
        {post.feature_image && <img src={post.feature_image} className='w-100'/>}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </>
  )
}

export default PostPage

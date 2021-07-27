import '../styles/globals.css'
import { subscribeEmail } from "../lib/posts"
import { DefaultSeo } from 'next-seo'


function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <DefaultSeo
        titleTemplate={`%s | ${process.env.NEXT_PUBLIC_BLOG_TITLE}`}
        openGraph={{
          type: 'website',
          locale: 'en_EN',
          url: process.env.NEXT_PUBLIC_BLOG_URL,
          site_name: process.env.NEXT_PUBLIC_BLOG_TITLE,
        }}
        twitter={{
          handle: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
          // cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
      <form 
        className="border-4 bg-white p-8 my-8"
        onSubmit={(e) => {
          e.preventDefault()
          subscribeEmail(e.target.email.value)
        }}>
        <span className='mb-3'>Subscribe to get future posts. No spam ever.</span>
        <br/>
        <div className='flex align-center mt-4 mb-1'>
          <input className="flex-1 shadow mr-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="email" name="email"/>
          <button className="btn btn-blue" type='submit'>Subscribe →</button>
        </div>
      </form>
      <p className='text-center text-sm opacity-80'>
        <a href='https://twitter.com/vincelwt'>twitter</a> - <a href='https://github.com/vincelwt/ghost-next-minimal'>github</a>
      </p>
    </div>
  )
}

export default MyApp

import '../styles/globals.css'
import { subscribeEmail } from "../lib/posts"

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <Component {...pageProps} />
      <form 
        className="border-4 bg-white p-8 my-8"
        onSubmit={(e) => {
          e.preventDefault()
          subscribeEmail(e.target.email.value)
        }}>
        <span className='mb-3'>Subscribe to get future posts. No spam ever.</span>
        <br/>
        <div className='flex align-center my-4 '>
          <input className="flex-1 shadow mr-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="email" name="email"/>
          <button className="btn btn-blue" type='submit'>Subscribe →</button>
        </div>
      </form>
    </div>
  )
}

export default MyApp

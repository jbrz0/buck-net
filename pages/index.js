import Head from 'next/head'
import Nav from '../components/Shared/Nav'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      {/* <p>HOME</p> */}
    </div>
  )
}
